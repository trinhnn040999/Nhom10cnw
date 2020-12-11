let broads = document.getElementById('broads');

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

// hien thi bang ra trang Home
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
                    // dua du lieu de serve xu ly
                    // cap nhat co so du lieu
                $.ajax({
                    type: "POST",
                    url: "/broad/create_broad",
                    data: data,
                    dataType: "json",
                });

                $.ajax({
                        type: 'GET',
                        url: '/api/get_id_broad'
                    })
                    .then(id => {
                        showBroad(data['broadName'], id['id'])
                    })
                    // showBroad(broad_name.value, 1)

            })
            .catch(err => {
                console.log(err)
            })
    }
})