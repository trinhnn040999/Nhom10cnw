// Xử lý hàm search
// Khi người dùng nhập key vào, nó sẽ lấy dữ liệu từ db đổ vào , cái này chỉ search broad thôi.
$(document).ready(function() {
    $("input.form-control.form-control-sm.ml-3.w-75.dropdown-toggle").keydown(function() {
        $('#resultSearch').empty(); //Hàm xóa hết các li bên trong
        // Hàm append này chỉ cần thay nd CNWeb với link thẻ a, link img
        $.ajax({
                type: 'GET',
                url: '/api/get_board'
            })
            .then(data => {
                data.forEach(element => {
                    $('#resultSearch').append(
                        `
                        <li class="dropdown-item">
                            <a href="/broad/` + element['id'] + `>
                                <span>
                                    <img width="40" height="40" src="/images/contact-background.jpg" style="margin-right: 40px;"> 
                                    ` + element['broadName'] + `
                                </span>
                            </a>
                        </li>
                        `
                    );
                });
            })


    });
});