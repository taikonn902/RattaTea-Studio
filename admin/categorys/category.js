// Mobile Nav active link
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = document.body.dataset.page;

    document.querySelectorAll('.nav-item').forEach(link => {
        link.classList.remove('nav-active');

        if (link.dataset.nav === currentPage) {
            link.classList.add('nav-active');
        }
    });
});

// open & close mobile nav
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('mobileNavToggle');
    const closeBtn = document.getElementById('mobileNavClose');
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('mobileNavOverlay');

    function openMenu() {
        mobileNav.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileNav.classList.add('translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
});

// logic modal thêm loại sản phẩm
const modal = document.getElementById('categoryModal');
const modalBox = modal.querySelector('.relative');

const openBtn = document.getElementById('openCategoryModal');
const closeBtn = document.getElementById('closeCategoryModal');
const cancelBtn = document.getElementById('cancelCategory');
const overlay = document.getElementById('categoryOverlay');

/* ================= OPEN MODAL ================= */
function openModal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // reset trạng thái
    modalBox.classList.remove('translate-y-0', 'opacity-100');
    modalBox.classList.add('translate-y-full', 'opacity-0');

    // trigger animation
    requestAnimationFrame(() => {
        modalBox.classList.remove('translate-y-full', 'opacity-0');
        modalBox.classList.add('translate-y-0', 'opacity-100');
    });

    document.body.style.overflow = 'hidden';

    const firstInput = modal.querySelector('input, textarea');
    if (firstInput) firstInput.focus();
}

/* ================= CLOSE MODAL ================= */
function closeModal() {
    modalBox.classList.remove('translate-y-0', 'opacity-100');
    modalBox.classList.add('translate-y-full', 'opacity-0');

    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    /* ================= EVENTS ================= */
    openBtn?.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});


// Load danh sách category
const categoryList = document.getElementById('categoryList');

async function loadCategoryList() {
    try {
        const res = await fetch('../api/show-category.php');
        const data = await res.json();

        if (!data.success) {
            showToast(data.message || 'Lỗi khi tải danh sách', 'error');
            return;
        }

        categoryList.innerHTML = '';

        data.data.forEach(cat => {
            const div = document.createElement('div');
            div.className = 'bg-white rounded-xl shadow p-4 flex items-center justify-between';

            div.innerHTML = `
                <div>
                    <div class="font-semibold">${cat.category_name}</div>
                    <div class="text-xs text-gray-500">${cat.product_count} sản phẩm</div>
                </div>
                <div class="flex gap-3">
                    <!-- Nút Sửa -->
                    <button onclick="editCategory(${cat.category_id})"
                            class="w-10 h-10 flex items-center justify-center rounded-lg bg-green-500 text-white shadow hover:bg-green-600 hover:scale-110 transition"
                            title="Sửa">
                        <i class="fa fa-pen"></i>
                    </button>

                    <!-- Nút Xóa -->
                    <button onclick="deleteCategory(${cat.category_id})"
                            class="w-10 h-10 flex items-center justify-center rounded-lg bg-red-500 text-white shadow hover:bg-red-600 hover:scale-110 transition transform"
                            title="Xóa">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            `;
            categoryList.appendChild(div);
        });

    } catch (err) {
        console.error(err);
        showToast('Không thể kết nối server', 'error');
    }
}

// Thêm mới category
document.addEventListener('DOMContentLoaded', () => {
    const categoryForm = document.getElementById('categoryForm');
    const saveBtn = categoryForm.querySelector('button[type="submit"]');

    categoryForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = document.getElementById('categoryName').value.trim();
        const desc = document.getElementById('categoryDesc').value.trim();

        // Validate
        if (!name) {
            showToast('Vui lòng nhập tên loại sản phẩm', 'error');
            return;
        }

        // Loading
        saveBtn.disabled = true;
        saveBtn.textContent = 'Đang lưu...';

        const formData = new FormData();
        formData.append('category_name', name);
        formData.append('category_description', desc);

        try {
            const res = await fetch('../api/category.php', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) {
                showToast(`Lỗi server: ${res.status}`, 'error');
                return;
            }

            let data;
            try {
                data = await res.json();
            } catch {
                showToast('Server trả về dữ liệu không hợp lệ', 'error');
                return;
            }

            if (data.success) {
                showToast(data.message || 'Thêm thành công', 'success');

                categoryForm.reset();

                closeModal();

                loadCategoryList();
            } else {
                showToast(data.message || 'Có lỗi xảy ra', 'error');
            }

        } catch (err) {
            console.error(err);
            showToast('Không thể kết nối server', 'error');
        } finally {
            saveBtn.disabled = false;
            saveBtn.textContent = 'Lưu';
        }
    });
});

// Sửa category
async function editCategory(id) {
    try {
        const res = await fetch(`../api/edit-category.php?id=${id}`);
        const result = await res.json();

        if (!result.success) {
            showToast(result.message || 'Không lấy được dữ liệu', 'error');
            return;
        }

        const cat = result.data;

        Swal.fire({
            title: '',
            html: `
                <div class="p-1">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-11 h-11 rounded-full bg-green-100 text-green-600
                                    flex items-center justify-center text-lg">
                            <i class="fa fa-tags"></i>
                        </div>
                        <div>
                            <h2 class="text-lg font-semibold text-gray-800">
                                Sửa loại sản phẩm
                            </h2>
                            <p class="text-sm text-gray-500">
                                Thông tin loại sản phẩm sẽ được sửa lại
                            </p>
                        </div>
                    </div>

                    <div class="border-t my-4"></div>

                    <div class="space-y-5 text-left">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Tên loại sản phẩm
                            </label>
                            <div class="relative">
                                <i class="fa fa-pen absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input id="category-name"
                                    type="text"
                                    value="${cat.category_name}"
                                    class="w-full pl-10 pr-4 py-2.5 border rounded-xl
                                            focus:ring-2 focus:ring-green-500 focus:border-green-500
                                            transition">
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Mô tả
                            </label>
                            <textarea id="category-desc"
                                    rows="3"
                                    class="w-full px-4 py-2.5 border rounded-xl
                                            focus:ring-2 focus:ring-green-500 focus:border-green-500
                                            transition"
                            >${cat.category_description ?? ''}</textarea>
                        </div>
                    </div>
                </div>
            `,
            width: 520,
            showCancelButton: true,
            confirmButtonText: 'Lưu thay đổi',
            cancelButtonText: 'Hủy',
            buttonsStyling: false,
            customClass: {
                popup: 'rounded-2xl shadow-xl',
                confirmButton:
                    'px-6 py-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition font-medium',
                cancelButton:
                    'px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition ml-3'
            },

            preConfirm: async () => {
                const name = document.getElementById('category-name').value.trim();
                const desc = document.getElementById('category-desc').value.trim();

                if (!name) {
                    Swal.showValidationMessage('Tên loại sản phẩm không được để trống');
                    return false;
                }

                const formData = new FormData();
                formData.append('category_id', id);
                formData.append('category_name', name);
                formData.append('category_description', desc);

                const updateRes = await fetch('../api/edit-category.php', {
                    method: 'POST',
                    body: formData
                });

                return updateRes.json();
            }

        }).then((swalResult) => {
            if (swalResult.isConfirmed) {
                if (swalResult.value.success) {
                    showToast(swalResult.value.message, 'success');
                    loadCategoryList();
                } else {
                    showToast(swalResult.value.message, 'error');
                }
            }
        });

    } catch (err) {
        console.error(err);
        showToast('Lỗi khi sửa category', 'error');
    }
}

// Xóa category
function deleteCategory(id) {
    Swal.fire({
        title: '',
        html: `
            <div class="p-1">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-11 h-11 rounded-full bg-red-100 text-red-600
                                flex items-center justify-center text-lg">
                        <i class="fa fa-trash"></i>
                    </div>
                    <div>
                        <h2 class="text-lg font-semibold text-gray-800">
                            Xóa loại sản phẩm
                        </h2>
                        <p class="text-sm text-gray-500">
                            Hành động này không thể hoàn tác
                        </p>
                    </div>
                </div>

                <div class="border-t my-4"></div>

                <p class="text-gray-600 text-sm leading-relaxed">
                    Bạn có chắc chắn muốn xóa loại sản phẩm này?
                    <br>
                    <span class="text-red-500 font-medium">
                        Tất cả dữ liệu liên quan sẽ bị xóa vĩnh viễn.
                    </span>
                </p>
            </div>
        `,
        width: 480,
        showCancelButton: true,
        confirmButtonText: 'Xóa ngay',
        cancelButtonText: 'Hủy',
        buttonsStyling: false,
        customClass: {
            popup: 'rounded-2xl shadow-xl',
            confirmButton:
                'px-6 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition font-medium',
            cancelButton:
                'px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition ml-3'
        }
    }).then(async (result) => {
        if (!result.isConfirmed) return;

        try {
            const formData = new FormData();
            formData.append('category_id', id);

            const res = await fetch('../api/delete-category.php', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();

            if (data.success) {
                showToast(data.message, 'success');
                loadCategoryList();
            } else {
                showToast(data.message, 'error');
            }
        } catch (err) {
            console.error(err);
            showToast('Lỗi khi xóa category', 'error');
        }
    });
}

// Load danh sách khi trang load
document.addEventListener('DOMContentLoaded', loadCategoryList);

