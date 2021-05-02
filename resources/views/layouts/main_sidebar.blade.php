
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="/home" class="brand-link">
      <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">AdminLTE 3</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block">{{ Auth::user()->name }}</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          @if (Auth::user()->position == 1)
            <li class="nav-item">
              <a href="/user" class="nav-link">
                <i class="nav-icon fas fa-th"></i>
                <p>
                  Quản lý người dùng
                </p>
              </a>
            </li>
            <li class="nav-item">
              <a href="/course" class="nav-link">
                <i class="nav-icon fas fa-th"></i>
                <p>
                  Quản lý khóa học
                </p>
              </a>
            </li>
          @endif
          <li class="nav-item">
            <a href="/class-room" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Quản lý lớp học
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="/calendar" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Quản lý lịch dạy
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="/teach-class-replace" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Quản lý lịch dạy thay
              </p>
            </a>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
