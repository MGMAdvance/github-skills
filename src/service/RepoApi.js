import api from './api';

class RepoApi{

    username = '';
    repoList = [];
    repoLang = [];

    async constructor(user){
        this.username = user;
        this.listAllRepos(user);
    }

    async listAllRepos(user){
        await api.get(user + '/repos')
        .then(function(response){
            this.repoList = response.data;
        });
    }

    async getLangBytesByRepo(repo){
        // Get Bytes of a Repository
    }

    async calcLang(bytes){
        // Calculate the percentage
    }
}

export default RepoApi;