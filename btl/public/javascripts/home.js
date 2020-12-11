let broads = document.getElementById('broads');


// showBroad('ML-intership')
// showBroad('ML-intership_2')
// showBroad('ML-intership_1')

// hien thi cac bang ra ma hinh
function showBroad(broadName, id) {
    let a = document.createElement('a')
    a.setAttribute("href", '/broad/' + id)

    let div = document.createElement('div')
    div.classList.add("card")

    let b = document.createElement('b')
    b.innerText = broadName

    a.append(div)
    div.append(b)
    broads.append(a)
}


$.ajax({
        url: '/api',
        type: 'get'
    })
    .then(data => {
        console.log(data)
        data.forEach(element => {
            showBroad(element['broadName'], element['id'])
        });
    })
    .catch(err => {
        console.log(err)
    })

// tao them bang
var button = document.getElementById('create_Broad')
var broad_name = document.getElementById('broadName')

button.addEventListener('click', () => {
    if (broad_name.value.trim() != "") {
        $.ajax({
                type: 'GET',
                url: '/get/email'
            })
            .then(data => {
                console.log(data)
                var email = data['email']
                var data = {
                        'email': email,
                        'broadName': broad_name.value
                    }
                    // post
                $.ajax({
                    type: "POST",
                    url: "/broad/create_broad",
                    data: data,
                    dataType: "json",
                });
                showBroad(broad_name.value, 1)

            })
            .catch(err => {
                console.log(err)
            })
    }
})