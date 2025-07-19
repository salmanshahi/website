function handleSignup(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirm-password")
    .value.trim();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return false;
  }

  const user = {
    name: name,
    email: email,
    password: password,
  };
  localStorage.setItem("qposUser", JSON.stringify(user));
  alert("✅ Account created successfully!");
  return false;
}
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const storedUser = JSON.parse(localStorage.getItem("qposUser"));

  if (!storedUser) {
    alert("No account found. Please sign up first.");
    return false;
  }

  if (storedUser.email === email && storedUser.password === password) {
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email or password.");
  }

  return false;
}

function togglePassword(id, el) {
  const input = document.getElementById(id);
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";

  el.innerHTML = isPassword
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#666" viewBox="0 0 24 24">
         <path d="M12 6c-3.3 0-6.3 1.8-8 4.5 1.7 2.7 4.7 4.5 8 4.5s6.3-1.8 8-4.5c-1.7-2.7-4.7-4.5-8-4.5zm0 7.5c-1.7 0-3-1.3-3-3s1.3-3 
                 3-3 3 1.3 3 3-1.3 3-3 3z"/>
         <path d="M2 2l20 20" stroke="#666" stroke-width="2"/>
       </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#666" viewBox="0 0 24 24">
         <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 
                 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 
                 15.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 8.5 12 8.5s3.5 
                 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
       </svg>`;
}

function handleForgotPassword(event) {
  event.preventDefault();
  const email = document.getElementById("reset-email").value;
  if (!email) {
    alert("Please enter your email.");
    return false;
  }

  const storedUser = JSON.parse(localStorage.getItem("qposUser"));
  if (storedUser && storedUser.email === email) {
    alert("✅ Password reset link has been sent to your email (simulated).");
  } else {
    alert("No account found with this email.");
  }
  return false;
}

document.addEventListener("DOMContentLoaded", () => {
  const userMenuBtn = document.getElementById("userMenuBtn");
  const userDropdown = document.getElementById("userDropdown");

  if (userMenuBtn && userDropdown) {
    userMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      userDropdown.style.display =
        userDropdown.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (e) => {
      if (!userDropdown.contains(e.target) && e.target !== userMenuBtn) {
        userDropdown.style.display = "none";
      }
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("qposUser");
      window.location.href = "log-in.html";
    });
  }

  const hamburger = document.querySelector(".hamburger-menu");
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.querySelector(".sidebar");
  const mainContent = document.querySelector(".main-content");

  const toggleSidebar = () => {
    sidebar.classList.toggle("collapsed");
    mainContent.classList.toggle("collapsed");
  };

  if (hamburger) hamburger.addEventListener("click", toggleSidebar);
  if (menuBtn) menuBtn.addEventListener("click", toggleSidebar);
});

const fullscreenBtn = document.getElementById("fullscreenBtn");

fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      alert(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});
const profileBtn = document.getElementById("profileFullscreenBtn");

profileBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    mainContent.requestFullscreen().catch((err) => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});

function toggleSubmenu(id, el) {
  const submenu = document.getElementById(id);
  const chevron = el.querySelector(".nav-chevron");

  if (submenu.style.display === "block") {
    submenu.style.display = "none";
    chevron.classList.remove("rotate");
  } else {
    submenu.style.display = "block";
    chevron.classList.add("rotate");
  }
}

document.getElementById("posLink").addEventListener("click", function () {
  console.log("POS link clicked");
});

function toggleSubmenu(submenuId, element) {
  const submenu = document.getElementById(submenuId);
  const chevron = element.querySelector('.nav-chevron');
  
  if (submenu.style.display === 'block') {
    submenu.style.display = 'none';
    chevron.style.transform = 'rotate(0deg)';
  } else {
    submenu.style.display = 'block';
    chevron.style.transform = 'rotate(-90deg)';
  }

function setActiveSubmenuItem(pageName) {
 
  const submenuLinks = document.querySelectorAll('.submenu-link');
  submenuLinks.forEach(link => {
    link.classList.remove('active');
  });
  const currentPageLink = document.querySelector(`a[href="${pageName}.html"]`);
  if (currentPageLink) {
    currentPageLink.classList.add('active');
    
    const parentSubmenu = currentPageLink.closest('.submenu');
    if (parentSubmenu) {
      parentSubmenu.style.display = 'block';
      
      const parentNavLink = parentSubmenu.previousElementSibling;
      const chevron = parentNavLink.querySelector('.nav-chevron');
      if (chevron) {
        chevron.style.transform = 'rotate(-90deg)';
      }
    }
  }
}

function initializeActiveState() {
  const currentPage = window.location.pathname.split('/').pop();
  
  if (currentPage === 'customer.html') {
    setActiveSubmenuItem('customer');
  } else if (currentPage === 'supplier.html') {
    setActiveSubmenuItem('supplier');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  initializeActiveState();
  
 
  const userMenuBtn = document.getElementById('userMenuBtn');
  const userDropdown = document.getElementById('userDropdown');
  
  if (userMenuBtn && userDropdown) {
    userMenuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
    });
    document.addEventListener('click', function() {
      userDropdown.style.display = 'none';
    });
  }
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', function() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const submenuLinks = document.querySelectorAll('.submenu-link');
  
  submenuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
   
      submenuLinks.forEach(l => l.classList.remove('active'));
      
     
      this.classList.add('active');
  
    });
  });
});

function handlePageNavigation(href) {

  console.log('Navigating to:', href);
  window.location.href = href;
}
}


document.getElementById('collectionForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const amount = document.getElementById('collectionInput').value;
  if (amount) {
    alert(`Collected: ${amount}`);

  }
});
