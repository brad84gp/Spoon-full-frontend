const axios = require("axios")

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class SpoonacularApi {

    static token;

    static async request(endpoint, data = {}, method = 'get') {
        console.log(endpoint, data, method)
        console.debug("API Call:", endpoint, data, method);

        try {
          return await axios({
            method : method,
            url : `${BASE_URL}/${endpoint}`,
            headers : {
                'Content-Type' : 'application/json'
            },
            data : JSON.stringify(data)
          })
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
      }

      // USER RELATED ROUTES FOR API 
    
    static async loginUser(data){
        let res = await this.request('user/login', data, 'post')
        let userData = {
            user : res.data.response,
            _token : res.data._token
        }
        return userData
    }

    static async registerNewUser(data){
        let res = await this.request('user/register', data, 'post')
        let userData = {
            user : res.data.response,
            _token : res.data._token
        }
        return userData
    }

    static async editUserInfo(data, username){
      let res = await this.request(`user/update/${username}`, data, "patch")
      return res.data
    }

    static async deleteUserAccount(username){
      let res = await this.request(`user/delete/${username}`, {},  "delete")
      return res.data
    }

    // GROCERY LIST RELATED ROUTE FOR API

    static async addToGroceryList(data){
      let res = await this.request(`list/grocery/addItem`, data, 'post')
      console.log(res)
    }

    static async getGroceryList(username){
      let res = await this.request(`list/grocery/getItems/${username}`)
      let dataArray = res.data.map(el => {
        return [el.product_name, el.product_id]
      })
      return dataArray
    }

    // FAVORITE RECIPE RELATED ROUTES

    static async getRecipeId(recipeName){
      let res = await this.request(`list/recipes/getId/${recipeName}`)
      return res.data.recipe_id
    }

    static async getFavoriteRecipes(username){
      let res = await this.request(`list/recipes/getRecipes/${username}`)
      let dataArray = res.data.map(el => {
        return [el.recipe_name, el.recipe_id]
      })
      return dataArray
    }

    static async addFavoriteRecipe(data){
      let res = await this.request(`list/recipes/addRecipe`, data, 'post')
      return res
    }

    // POST RELATED ROUTES

    static async getAllPosts(){
      let res = await this.request('posts/user/allPosts')
      return res
    }

    static async getUserPosts(username){
      let res = await this.request(`posts/user/getPosts/${username}`)
     return res.data
    }

    static async addNewPost(data){
      let res = await this.request('posts/user/addPost', data, 'post')
      setTimeout(() => {
        console.log(res)
      }, 2000);
    }

    static async addComment(data){
      console.log(data)
      await this.request('posts/addComment', data, 'post')
    }

    static async getPostComments(postId){
      let response = await this.request(`posts/getComments/${postId}`)
      return response.data
    }
}


export default SpoonacularApi