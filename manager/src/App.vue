<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
          <div
            class="btn-toolbar"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            <div class="btn-group mr-2" role="group" aria-label="First group">
              <!-- <button type="button" class="btn btn-success" v-on:click="init">Start Serve</button> -->
              <button type="button" class="btn btn-secondary" v-on:click="init">
                Init
              </button>
              <button type="button" class="btn btn-primary" v-on:click="login">
                Login
              </button>
              <button
                type="button"
                class="btn btn-danger"
                v-on:click="run_followings"
              >
                Run Followings
              </button>
              <button
                type="button"
                class="btn btn-warning"
                v-on:click="run_queries"
              >
                Run Queries
              </button>
              <button
                type="button"
                class="btn btn-info"
                v-on:click="next_session"
              >
                Next session
              </button>
            </div>
          </div>
        </div>
        <!-- <div class="col-1">
          <input v-model="config.session_id" />
          Time Interval
          <select>
            <option v-for="interval in config.intervals" v-bind:key="interval">{{ interval }}</option>
          </select>
        </div> -->
        <div class="col-6">
          <p>
            Session: {{ config.session_id }} | Max results:
            {{ config.max_results }} | interval:
            {{ config.interval / 1000 }}
          </p>
          <!-- <p>
            Current query:
            <strong v-if="config.queries">{{
              config.queries[query_iterator - 1]
            }}</strong>
          </p> -->
        </div>
      </div>

      <div class="row justify-center">
        <div class="col">
          <div class="row">
            <div
              class="col col-6"
              v-for="agent in this.agents"
              v-bind:key="agent.id"
            >
              <p>{{ agent.id }}</p>
              <img
                v-bind:src="agent.image_data"
                class="w-100 screenshot-image"
              />
              <div class="btn-group mr-2" role="group" aria-label="First group">
                <button
                  type="button"
                  class="btn btn-primary"
                  v-on:click="() => login_agent(agent)"
                >
                  Login
                </button>
                <!-- <button
                  type="button"
                  class="btn btn-danger"
                  v-on:click="() => follow_agent(agent, 'MomentsBrasil')"
                >
                  Follow
                </button> -->
              </div>

              <div class="row">
                <h2>Query List</h2>
                <ul class="list-group">
                  <li
                    class="list-group-item"
                    v-for="query in config.queries_status[agent.id]"
                    v-bind:key="query"
                  >
                    {{ query.query }}
                    <!-- <span v-for="agent in config.agents" v-bind:key="agent.id"> -->
                    <StatusIcon v-bind:status="query.status"></StatusIcon>
                    <!-- </span> -->
                  </li>
                </ul>
              </div>
              <div class="row">
                <h2>Profiles</h2>
                <ul class="list-group">
                  <li
                    class="list-group-item"
                    v-for="profile in config.profiles_status[agent.id]"
                    v-bind:key="profile.profile"
                  >
                    {{ profile.profile }}
                    <StatusIcon v-bind:status="profile.status"></StatusIcon>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const init_config = session_id => {
  let _config = require(`./session_configs/twitter/${session_id}.json`);

  let new_config = {
    ..._config,
    queries_status: {},
    profiles_status: {},
    login_status: {},
    agents: { ..._config.agents }
  };

  for (let agent_key in _config.agents) {
    new_config.login_status[agent_key] = false;
    new_config.profiles_status[agent_key] = [];
    new_config.queries_status[agent_key] = [];
    for (let profile of _config.agents[agent_key].profiles) {
      new_config.profiles_status[agent_key].push({
        profile,
        status: "idle"
      });
    }
    for (let query of _config.agents[agent_key].queries) {
      new_config.queries_status[agent_key].push({
        query,
        status: "idle"
      });
    }
  }
  return new_config;
};

import StatusIcon from "./components/StatusIcon.vue";

export default {
  name: "app",
  data: () => ({
    sessions: [
"twitter-carry1"
    ],
    session_id: "",
    config: {},
    agents: {},
    session_iterator: 0,
    query_iterator: 0,
    follow_iterator: 0,
    login_status: {}
  }),
  sockets: {
    connect: function() {
      //与socket.io连接后回调
      this.$socket.emit("receive", "manager");
      this.$socket.emit("create", "room1");
    },
    ack_init(event) {
      console.log("ack_init");
      console.log("event", event.agents);
      this.query_iterator = 0;
      this.follow_iterator = 0;
      this.agents = event.agents;
      this.profiles = event.profiles_status;
      this.login_status = event.login_status;
    },
    ack_init_agent(agent_id) {
      console.log("ack_init_agent");
      console.log("this agent", this.agents);
      console.log(agent_id);
      console.log(this.agents[agent_id]);
      this.agents[agent_id].init = true;
      let ok = Object.keys(this.agents)
        .map(k => this.agents[k].init)
        .reduce((p, c) => p && c);
      if (ok) this.login();
    },
    screenshot(event) {
      if (this.agents[event.id])
        this.agents[
          event.id
        ].image_data = `data:image/png;base64, ${event.data}`;
      this.$forceUpdate();
    },
    end_query(event) {
      console.log("end query");
      this.config.queries_status[event.agent_id][
        this.query_iterator - 1
      ].status = "ok";

      let ok = Object.keys(this.config.agents)
        .map(agent => {
          if (this.config.queries_status[agent][this.query_iterator - 1]) {
            return this.config.queries_status[agent][this.query_iterator - 1]
              .status;
          }
          return "ok";
        })
        .every(v => v == "ok");

      if (ok) {
        if (
          this.query_iterator ==
          this.config.queries_status[event.agent_id].length
        ) {
          this.next_session();
        } else {
          this.next_query();
        }
      }
      console.log("finish query");
    },
    end_follow(event) {
      let index = this.config.profiles_status[event.agent_id].findIndex(
        p => p.profile == event.profile
      );
      this.config.profiles_status[event.agent_id][index].status = "ok";
      console.log("end follow");
      let ok = Object.keys(this.config.agents)
        .map(agent => {
          if (this.config.profiles_status[agent][this.follow_iterator - 1]) {
            return this.config.profiles_status[agent][this.follow_iterator - 1]
              .status;
          }
          return "ok";
        })
        .every(v => v == "ok");

      console.log(
        this.follow_iterator,
        this.config.profiles_status[event.agent_id].length
      );
      if (ok) {
        if (
          this.follow_iterator ==
          this.config.profiles_status[event.agent_id].length
        ) {
          this.next_query();
        } else {
          this.next_follow();
        }
      }
    },
    ack_login({ agent_id }) {
      this.login_status[agent_id] = true;

      let ok = Object.keys(this.login_status)
        .map(k => this.login_status[k])
        .reduce((p, c) => p && c);

      if (ok) {
        console.log("all agents logined");
        this.run_followings();
      }
    }
  },
  components: {
    StatusIcon
  },
  methods: {
    init() {
      // console.log(this.sessions[this.session_iterator])
      this.config = init_config(this.sessions[this.session_iterator]);
      this.$socket.emit("init", this.config);
    },
    next_session() {
      console.log("finish session");
      this.session_iterator++;
      if (this.session_iterator < this.sessions.length) {
        this.init();
      }
    },
    login() {
      this.$socket.emit("login", {});
    },
    login_agent(agent) {
      this.$socket.emit("login_agent", agent.id);
    },
    follow_agent(agent, profile) {
      this.$socket.emit("run_follow", { agent_id: agent.id, profile });
    },
    init_agent() {
      let agent = { id: 1, platform: "google" };
      this.agents.push(agent);

      this.$socket.emit("init_agent", agent);
    },
    send_command() {
      this.$socket.emit("command", this.term);
    },
    write_json() {
      this.$socket.emit();
    },
    run_queries() {
      this.next_query();
    },
    run_followings() {
      this.next_follow();
    },
    next_query() {

      for (let agent in this.config.agents) {
        if (!this.config.queries_status[agent][this.query_iterator]) continue;

        var wait;
        if (this.query_iterator+1!=this.config.queries_status[agent].length){
          wait='t';
        }else{
          wait='f';
        }
        this.$socket.emit("run_query", {
          agent_id: agent,
          query: this.config.queries_status[agent][this.query_iterator].query,
          session_id: this.config.session_id,
          max_results: this.config.max_results,
          date_intervals: this.config.date_intervals,
          interval: this.config.interval,
          cookie: this.config.agents[agent].cookie,
          wait:wait
        });
        this.config.queries_status[agent][this.query_iterator].status =
          "running";
      }

      this.query_iterator++;
    },
    next_follow() {
      console.log("follow");
      for (let agent in this.config.agents) {
        if (!this.config.profiles_status[agent][this.follow_iterator]) continue;
        console.log("run follow", agent);
        this.$socket.emit("run_follow", {
          agent_id: agent,
          profile: this.config.profiles_status[agent][this.follow_iterator]
            .profile
        });
        this.config.profiles_status[agent][this.follow_iterator].status =
          "running";
      }
      this.follow_iterator++;
      console.log("finish next follow");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.screenshot-image {
  border: 1px solid #ccc;
}
</style>

function newFunction() {
  let wait;
  return wait;
}
