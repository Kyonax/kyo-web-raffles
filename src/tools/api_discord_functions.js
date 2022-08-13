const axios = require('axios')
//Functions of APP - Everything Important
module.exports = {
    //GET FUNCTIONS REQUEST - API Discord
    getGuilds: async function () {
        let data = null, url = process.env.API_DISCORD + '/guilds';
        await axios.get(url).then((api_data_) => {
            data = api_data_.data;
        })

        return data
    },
    getGuild: async function (guild) {
        let data = null, url = process.env.API_DISCORD + `/guild/${guild}`;
        await axios.get(url).then((api_data_) => {
            data = api_data_.data;
        })

        return data
    },
    getMembers: async function (guild) {
        let data = null, url = process.env.API_DISCORD + `/guild/${guild}/members`;
        await axios.get(url).then((api_data_) => {
            data = api_data_.data;
        })

        return data
    },
    getMembersType: async function (guild, type) {
        let data = null, url = process.env.API_DISCORD + `/guild/${guild}/members/${type}`;
        await axios.get(url).then((api_data_) => {
            data = api_data_.data;
        })

        return data
    },
    getMember: async function (guild, id) {
        let data = null, url = process.env.API_DISCORD + `/guild/${guild}/member/${id}`;
        await axios.get(url).then((api_data_) => {
            data = api_data_.data;
            console.table(data);
        })

        return data
    },
    postGuild: async function (id, owner, language) {
        let _obj = { id: id, owner: owner, language: language, key: process.env.PASS }
        let _config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        }
        await axios.post(process.env.API_DISCORD + `/guild/create`, _obj, _config)
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error.response);
            });
    },
    postMember: async function (id, guild, language) {
        let _obj = { id: id, guild: guild, language: language, key: process.env.PASS }
        let _config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        }
        await axios.post(process.env.API_DISCORD + `/member/create`, _obj, _config)
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error.response);
            });
    },
    deleteGuild: async function (id) {
        let _obj = { id: id, key: process.env.PASS }
        let _config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        }
        axios.post(process.env.API_DISCORD + `/guild/delete`, _obj, _config)
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error.response);
            });
    },
    deleteMember: async function (id, guild) {
        let _obj = { id: id, guild: guild, key: process.env.PASS }
        let _config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        }
        axios.post(process.env.API_DISCORD + `/member/delete`, _obj, _config)
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error.response);
            });
    }, patchPerms: async function (member, guild, type, value) {
        let _obj = { id: member, guild: guild, value: value, key: process.env.PASS }
        let _config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        }
        axios.post(process.env.API_DISCORD + `/member/perms/${type}/update`, _obj, _config)
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error.response);
            });
    }, patchDataMember: async function (member, guild, attribute, value) {
        let _obj = { id: member, guild: guild, attribute: attribute, value: value, key: process.env.PASS }
        let _config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        }
        axios.post(process.env.API_DISCORD + `/member/data/update`, _obj, _config)
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error.response);
            });
    }, patchStatusMember: async function (member, guild, attribute, value) {
        let _obj = { id: member, guild: guild, attribute: attribute, value: value, key: process.env.PASS }
        let _config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        }
        axios.post(process.env.API_DISCORD + `/member/status/update`, _obj, _config)
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error.response);
            });
    }, patchBankMember: async function (member, guild, attribute, value) {
        let _obj = { id: member, guild: guild, attribute: attribute, value: value, key: process.env.PASS }
        let _config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        }
        axios.post(process.env.API_DISCORD + `/member/bank/update`, _obj, _config)
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error.response);
            });
    }, patchDataGuild: async function (id, attribute, value) {
        let _obj = { id: id, attribute: attribute, value: value, key: process.env.PASS }
        let _config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        }
        axios.post(process.env.API_DISCORD + `/guild/data/update`, _obj, _config)
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error.response);
            });
    }

}