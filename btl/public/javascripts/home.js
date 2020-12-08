let broads = document.getElementById('broads');


// createBroad('ML-intership')
// createBroad('ML-intership_2')
// createBroad('ML-intership_1')


function createBroad(broadName, id) {
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
            createBroad(element['broadName'], element['id'])
        });
    })
    .catch(err => {
        console.log(err)
    })