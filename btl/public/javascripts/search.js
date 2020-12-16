// Xử lý hàm search
// Khi người dùng nhập key vào, nó sẽ lấy dữ liệu từ db đổ vào , cái này chỉ search broad thôi.
$(document).ready(function(){
    $("input.form-control.form-control-sm.ml-3.w-75").keydown(function(){
        // Hàm append này chỉ cần thay nd CNWeb với link thẻ a, link img
        $('li.nav-item.search .dropdown .dropdown-menu #resultSearch').append(
            `
            <li class="dropdown-item">
                <a href="#">
                    <span><img width="40" height="40" src="../public/images/contact-background.jpg" style="margin-right: 40px;"> CNWeb nhóm 10 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate odit dolorum, a quidem dignissimos quos eveniet dolorem eligendi soluta. Minus recusandae suscipit adipisci distinctio molestias, aut commodi esse quis tenetur?-=-==</span>
                </a>
            </li>
            `
        );
    });
  });


