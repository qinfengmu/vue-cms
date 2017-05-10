/**
 * Created by Administrator on 2017/4/5.
 */
export default {

  state : {

    text: '',
    showLoading: true
  },
  getters: {
    getText (state){ return state.text}
  },
  mutations: {
    setText (state, text)  {
      state.text = text;
    },
    setShowLoading (state, text) {
      state.showLoading = text
    }
  },
  actions: {
    setLoadingText ({commit},text){
      commit('setText',text);
    },
    setShowLoading ({commit},text) {
      commit('setShowLoading',text);
    }
  }

}
