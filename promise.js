//1. 导入fs模块
// const fs = require("fs")
// 2.调用fs.readFile（）文件读取方法
 

// fs.readFile("./test1.txt","utf8",function(err,dataStr){
//     // 如果读取成功，则err的值为null，dataStr会显示例1.txt的文本内容
//     // 如果读取失败，err的值为错误对象，展示出错误信息，dataStr的值为undefined
//     console.log(err)
//     console.log("------")
//     console.log(dataStr)
// })




// 读取文件
// var _promise = new Promise((reslove,reject)=>{
//     fs.readFile("./test1.txt","utf8",function(err,dataStr){
//         // 如果读取成功，则err的值为null，dataStr会显示例1.txt的文本内容
//         // 如果读取失败，err的值为错误对象，展示出错误信息，dataStr的值为undefined
//         if(err) reject(err)
//         else reslove(dataStr)
//     })
// })
// _promise.then((data)=>{
//     console.log(data);
// },(data)=>{
//     console.log(data);
// })

// 读取文件
// const util = require('util')
// const fs = require('fs')
// let readFile = util.promisify(fs.readFile)
// readFile('./test1.txt').then(value=>{
//     console.log(value.toString())
// })




// Promise ajax请求文件
// const _p = new Promise((resolve,reject)=>{
//     // 1.创建对象
//     const xhr = new XMLHttpRequest()
//     // 2.初始化
//     xhr.open('get','https://api.apiopen.top/api/sentences')
//     // 3.发送
//     xhr.send()
//     // 4.处理相应结果
//     xhr.onreadystatechange = function(date){
//         if(xhr.readyState == 4){
//             if(xhr.status>=200 && xhr.status<400){
//                 resolve(xhr.response)
//             }else{
//                 resolve(xhr.status)
//             }
//         }
//     }
// })
// _p.then((data)=>{
//     console.log(data);
// },(data)=>{
//     console.log(data);
// })


// promise请求数据接口封装
// function sendAJAX(url){
//     return new Promise((resolve,reject)=>{
//         // 1.创建对象
//         const xhr = new XMLHttpRequest()
//         // 2.初始化
//         xhr.open('get',url)
//         // 3.发送
//         xhr.send()
//         // 4.处理相应结果
//         xhr.onreadystatechange = function(date){
//             if(xhr.readyState == 4){
//                 if(xhr.status>=200 && xhr.status<400){
//                     resolve(xhr.response)
//                 }else{
//                     resolve(xhr.status)
//                 }
//             }
//         }
//     })
// }
// sendAJAX('https://api.apiopen.top/api/sentences').then(value=>{
//     console.log(value);
// },err=>{

// })




// 自定义封装promise
function Promise(executor){
	this.PromiseState = 'pending'
	this.PromiseResult = null
	this.callbacks = [];
	const _this = this
	function reslove(data){
		if(_this.PromiseState !== 'pending') return
		// 1.修改状态(promiseState)
		_this.PromiseState = 'fulfilled'
		// 2.设置对象结果值(PromiseResult)
		_this.PromiseResult = data
		// 调用成功的回调函数
		setTimeout(()=>{
			_this.callbacks.forEach(item=>{
				item.onResloved(data)
			})
		})
	}
	function reject(data){
		if(_this.PromiseState !== 'pending') return
		// 1.修改状态(promiseState)
		_this.PromiseState = 'rejected'
		// 2.设置对象结果值(PromiseResult)
		_this.PromiseResult = data
		// 调用失败的回调函数
		setTimeout(()=>{
			_this.callbacks.forEach(item=>{
				item.onRejected(data)
			})
		})
	}
	try{
		executor(reslove,reject)
	}catch(e){
		//TODO handle the exception
		reject(e)
	}
}
Promise.prototype.then = function(onResloved,onRejected){
	const _this = this
	if(typeof onRejected !== 'function'){
		onRejected = reason =>{
			throw reason;
		}
	}
	if(typeof onResloved !== 'function'){
		onResloved = value=> value
	}
	return new Promise((resolve,reject)=>{
		// 封装函数
		function callback(type){
			try{
				let result = type(_this.PromiseResult)
				if(result instanceof Promise){
					result.then(v =>{
						resolve(v)
					},r=>{
						reject(r)
					})
				}else{
					// 结果的对象状态为成功
					resolve(result)
				}
			}catch(e){
				reject(e)
			}
		}
		// 调用回调函数
		if(this.PromiseState === 'fulfilled'){
			setTimeout(()=>{
				callback(onResloved)
			})
		}
		if(this.PromiseState === 'rejected'){
			setTimeout(()=>{
				callback(onRejected)
			})
		}
		if(this.PromiseState === 'pending'){
			// 保存回调函数
			this.callbacks.push({
				onResloved:function(){
					callback(onResloved)
				},
				onRejected:function(){
					callback(onRejected)
				}
			});
		}
	})
}
Promise.prototype.catch = function(onRejected){
	return this.then(undefined,onRejected)
}
Promise.resolve = function(value){
	return new Promise((resolve,reject)=>{
		if(value instanceof Promise){
			value.then(v=>{
				resolve(v)
			},r=>{
				reject(r)
			})
		}else{
			// 如果是promise 直接返回成功
			resolve(value)
		}
	})
}
Promise.reject = function(reason){
	return new Promise((resolve,reject)=>{
		reject(reason)
	})
}
Promise.all = function(promises){
	return new Promise((resolve,reject)=>{
		let count = 0
		let arr = []
		for (let i=0;i<promises.length;i++){
			promises[i].then(v=>{
				// 得知对象状态是成功
				count++
				// 将当前promise对象成功的结果 存入数组中
				arr[i] = v
				// 判断
				if(count === promises.length){
					resolve(arr)
				}
			},r=>{
				reject(r)
			})
		}
	})
}
Promise.race = function(promises){
	return new Promise((resolve,reject)=>{
		for (let i=0;i<promises.length;i++){
			promises[i].then(v=>{
				resolve(v)
			},r=>{
				reject(r)
			})
		}
	})
}
// let _p = new Promise((reslove,reject)=>{
// 	setTimeout(()=>{
// 		reslove('ok')
// 		// reject('error')
// 		// throw "error"
// 	},1000)
// })
// _p.then().then(value=>{
// 	console.log(2222)
// }).then(value=>{
// 	console.log(3333)
// }).catch(reason=>{
// 	console.warn(reason);
// })

// const result = _p.then((value)=>{
//     console.log(value);
// },(reason)=>{
//     console.warn(reason);
// })
// console.log(result)





// class方法封装
class Promise{
	constructor(executor) {
	    this.PromiseState = 'pending'
	    this.PromiseResult = null
	    this.callbacks = [];
	    const _this = this
	    function reslove(data){
	    	if(_this.PromiseState !== 'pending') return
	    	// 1.修改状态(promiseState)
	    	_this.PromiseState = 'fulfilled'
	    	// 2.设置对象结果值(PromiseResult)
	    	_this.PromiseResult = data
	    	// 调用成功的回调函数
	    	setTimeout(()=>{
	    		_this.callbacks.forEach(item=>{
	    			item.onResloved(data)
	    		})
	    	})
	    }
	    function reject(data){
	    	if(_this.PromiseState !== 'pending') return
	    	// 1.修改状态(promiseState)
	    	_this.PromiseState = 'rejected'
	    	// 2.设置对象结果值(PromiseResult)
	    	_this.PromiseResult = data
	    	// 调用失败的回调函数
	    	setTimeout(()=>{
	    		_this.callbacks.forEach(item=>{
	    			item.onRejected(data)
	    		})
	    	})
	    }
	    try{
	    	executor(reslove,reject)
	    }catch(e){
	    	//TODO handle the exception
	    	reject(e)
	    },
		
	}
	then(onResloved,onRejected){
		const _this = this
		if(typeof onRejected !== 'function'){
			onRejected = reason =>{
				throw reason;
			}
		}
		if(typeof onResloved !== 'function'){
			onResloved = value=> value
		}
		return new Promise((resolve,reject)=>{
			// 封装函数
			function callback(type){
				try{
					let result = type(_this.PromiseResult)
					if(result instanceof Promise){
						result.then(v =>{
							resolve(v)
						},r=>{
							reject(r)
						})
					}else{
						// 结果的对象状态为成功
						resolve(result)
					}
				}catch(e){
					reject(e)
				}
			}
			// 调用回调函数
			if(this.PromiseState === 'fulfilled'){
				setTimeout(()=>{
					callback(onResloved)
				})
			}
			if(this.PromiseState === 'rejected'){
				setTimeout(()=>{
					callback(onRejected)
				})
			}
			if(this.PromiseState === 'pending'){
				// 保存回调函数
				this.callbacks.push({
					onResloved:function(){
						callback(onResloved)
					},
					onRejected:function(){
						callback(onRejected)
					}
				});
			}
		})
	}
	catch(onRejected){
		return this.then(undefined,onRejected)
	}
	static resolve(value){
		return new Promise((resolve,reject)=>{
			if(value instanceof Promise){
				value.then(v=>{
					resolve(v)
				},r=>{
					reject(r)
				})
			}else{
				// 如果是promise 直接返回成功
				resolve(value)
			}
		})
	}
	static reject(reason){
		return new Promise((resolve,reject)=>{
			reject(reason)
		})
	}
	static all(promises){
		return new Promise((resolve,reject)=>{
			let count = 0
			let arr = []
			for (let i=0;i<promises.length;i++){
				promises[i].then(v=>{
					// 得知对象状态是成功
					count++
					// 将当前promise对象成功的结果 存入数组中
					arr[i] = v
					// 判断
					if(count === promises.length){
						resolve(arr)
					}
				},r=>{
					reject(r)
				})
			}
		})
	}
	static race(promises){
		return new Promise((resolve,reject)=>{
			for (let i=0;i<promises.length;i++){
				promises[i].then(v=>{
					resolve(v)
				},r=>{
					reject(r)
				})
			}
		})
	}
}
