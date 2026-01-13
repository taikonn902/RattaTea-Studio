<aside id="sidebar"
    class="sidebar h-screen bg-primary text-white flex flex-col transition-all duration-300 ease-in-out w-20 relative z-20">
    <div class="flex flex-col flex-1 h-full">
        <!-- Logo + Nút mở/đóng -->
        <div id="logoContainer" class="w-full flex items-center justify-center p-4 relative">
            <div id="sidebarLogo" class="flex items-center gap-2 cursor-pointer transition-all duration-300">
                <img src="assets/images/logo.jpg" alt="Logo"
                    class="w-10 h-10 rounded-full bg-white p-1 logo-img transition-all duration-300">
                <span class="text-2xl font-great-vibes logo-text hidden">RattaTea Studio</span>
            </div>
            <button id="sidebarClose"
                class="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-accent text-white hover:text-primary transition-all hidden">
                <i class="fa fa-angle-left text-lg"></i>
            </button>
        </div>

        <!-- Nav -->
        <nav id="sidebarNav" class="flex-1 flex flex-col justify-start w-full">
            <a href="#" class="nav-link flex items-center py-4 px-4 rounded hover:bg-accent transition gap-4">
                <i class="fa fa-home text-2xl"></i>
                <span class="nav-text text-[15px] text-base font-medium hidden">Trang chủ</span>
            </a>
            <a href="#" class="nav-link flex items-center py-4 px-4 rounded hover:bg-accent transition gap-4">
                <i class="fa fa-users text-2xl"></i>
                <span class="nav-text text-[15px] text-base font-medium hidden">Người dùng</span>
            </a>
            <a href="#" class="nav-link flex items-center py-4 px-4 rounded hover:bg-accent transition gap-4">
                <i class="fa fa-shopping-cart text-2xl"></i>
                <span class="nav-text text-[15px] text-base font-medium hidden">Đơn hàng</span>
            </a>
            <a href="#" class="nav-link flex items-center py-4 px-4 rounded hover:bg-accent transition gap-4">
                <i class="fa fa-box text-2xl"></i>
                <span class="nav-text text-[15px] text-base font-medium hidden">Sản phẩm</span>
            </a>
            <a href="#" class="nav-link flex items-center py-4 px-4 rounded hover:bg-accent transition gap-4">
                <i class="fa fa-chart-line text-2xl"></i>
                <span class="nav-text text-[15px] text-base font-medium hidden">Báo cáo</span>
            </a>
        </nav>

        <!-- Logout -->
        <div class="mt-auto w-full flex flex-col items-center p-4">
            <a href="../login.html"
                class="w-full gap-6 items-center justify-center gap-2 bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-accent hover:text-white transition">
                <i class="fa fa-sign-out-alt"></i>
                <span class="nav-text hidden">Đăng xuất</span>
            </a>
        </div>
    </div>
</aside>