import { createStore } from "vuex";
import EventService from "@/services/EventService";

export default createStore({
  state: {
    user: { id: "123", name: "Kookkoo" },
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community",
    ],
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false },
      { id: 3, text: "...", done: true },
      { id: 4, text: "...", done: false },
    ],
    events: [],
    event: {},
  },
  getters: {
    catLength: (state) => state.categories.length,
    doneTodos: (state) => {
      return state.todos.filter((item) => !item.done); // same output (item) => item.done == false
    },
    activeTodosCount: (state) => {
      return state.todos.filter((item) => item.done == true).length;
    },
    getTodosById: (state) => (id) => {
      return state.todos.filter((item) => item.id == id);
    },
    getEventById: (state) => (id) => {
      return state.events.filter((event) => event.id == id); //Return output as array
    },
    getEventById2: (state) => (id) => {
      return state.events.find((event) => event.id === id); //Return output as object
    },
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
  },
  actions: {
    createdEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event);
      });
    },
    fetchEvent({ commit }) {
      EventService.getEvents()
        .then((response) => {
          commit("SET_EVENTS", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchEventById({ commit, getters }, id) {
      let event = getters.getEventById2(id);
      if (event) {
        commit("SET_EVENT", event);
      } else {
        EventService.getEvent(id)
          .then((response) => {
            commit("SET_EVENT", response.data);
          })
          .catch((error) => {
            console.log("Err to fetch event by ID" + error);
          });
      }
    },
  },
  modules: {},
});
