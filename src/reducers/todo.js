const todos=(state,action)=>{
	switch(action,state){
		case "ADD_TODO":
			return{
				id=action.id,
				text:action.text,
				completed:false,
			}
		case "TOGGLE_TODO":
			if(state.id!==action.id)
			return Object.assign({},state,{
				completed:!state.completed
			})
		defalt:
		return state
	}
}
export default todos
//Object.assign({},state,{
//				completed:!state.completed
//			})
//意思是把后俩对象合并放到第一个对象里