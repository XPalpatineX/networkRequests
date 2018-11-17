function createElem(type) {
    return document.createElement(type);
}

function append(parent,item) {
    return parent.appendChild(item)
}

class NetworkRequests {
    constructor(url,{method = "GET",headers = new Headers({'Content-Type': 'application/json'}),body}) {
        this.url = url;

        this.options = {
            method: method,
            headers: headers,
            body: body
        }

        this.request = this.request.bind(this);
        this.updateOption = this.updateOption.bind(this);
    }

    updateOption({method = "GET",headers = new Headers({'Content-Type': 'application/json'}),body}) {
        this.options = {
            method: method,
            headers: headers,
            body: body
        }
    }

    request(url = this.url,options = this.options) {
        switch(options.method) {
            case "GET":
                fetch(url,options)
                .then(res => {
                    if (res.ok == true) {
                        return res.json()
                    }
                    throw new Error(`responce status = ${res.status}`);
                })
                .then((res) => {
                    let box = document.getElementById('box');
                    if (Array.isArray(res.data)) {
                        res.data.map((item) => {
                            let imgSrc = item.avatar
                            let img = createElem('img');
                            img.src = imgSrc;
                            append(box,img);
                        })
                    } else {
                        let imgSrc = res.data.avatar
                        let img = createElem('img');
                        img.src = imgSrc;
                        append(box,img);
                    }
            
                   
                })
                break;
            case "POST":
                fetch(url,options)
                .then(res => {
                    if (res.ok == true) {
                        return res.json()
                    }
                    throw new Error(`responce status = ${res.status}`);
                })
                .then(res => {
                    console.log(res)
                })
                break;
            case "DELETE":
                fetch(url,options)
                .then(res => {
                    console.log(res)
                    if (res.ok == true) {
                        return res.text()
                    }
                    throw new Error(`responce status = ${res.status}`);
                })
                .then(res => {
                    console.log(res)
                })
                break;
            case "PATCH":
                fetch(url,options)
                .then(res => {
                    console.log(res)
                    if (res.ok == true) {
                        return res.json()
                    }
                    throw new Error(`responce status = ${res.status}`);
                })
                .then(res => {
                    console.log(res)
                })
            break;
        }

    }

}

const user = {
    id: 99,
    name: 'Nikita',
    surname: 'Chernyavsky',
    age: 20
}

const updatedUser = {
    id: 99,
    name: 'Anton',
    surname: 'Chernyavsky',
    age: 25
}

const requestDelete = {
    method: "DELETE",
    body: JSON.stringify(user)
}

const requestPost = {
    method: "POST",
    body: JSON.stringify(user)
}

const requestPatch = {
    method: "PATCH",
    body: JSON.stringify(user)
}

const requestGet = {
    method: "GET"
}

const req = new NetworkRequests('https://reqres.in/api/users/2', requestGet);
req.request();

//для PATCH запроса
// setTimeout(() => {
//     req.request('https://reqres.in/api/users/2',requestPatch);
// },2000)

req.updateOption(requestPost);
req.request()
setTimeout(() => {
    req.updateOption(requestGet)
    req.request('https://reqres.in/api/users')
},2000)
