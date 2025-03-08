document.addEventListener("DOMContentLoaded", () => {
  // Tab switching functionality
  const tabButtons = document.querySelectorAll(".auth-tab")
  const authForms = document.querySelectorAll(".auth-form")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all tabs
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked tab
      this.classList.add("active")

      // Hide all forms
      authForms.forEach((form) => form.classList.remove("active"))

      // Show the corresponding form
      const formId = this.getAttribute("data-tab") + "-form"
      document.getElementById(formId).classList.add("active")

      // Reset form validation
      const form = document.getElementById(formId).querySelector("form")
      form.classList.remove("was-validated")
      form.reset()
    })
  })

  // Check URL for register parameter
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get("register") === "true") {
    document.querySelector('.auth-tab[data-tab="register"]').click()
  }

  // Password toggle functionality
  document.querySelectorAll(".password-toggle").forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target")
      const passwordInput = document.querySelector(targetId)
      const icon = this.querySelector("i")

      if (passwordInput.type === "password") {
        passwordInput.type = "text"
        icon.classList.remove("bi-eye")
        icon.classList.add("bi-eye-slash")
      } else {
        passwordInput.type = "password"
        icon.classList.remove("bi-eye-slash")
        icon.classList.add("bi-eye")
      }
    })
  })

  // Password strength meter
  const passwordInput = document.getElementById("registerPassword")
  const strengthBar = document.querySelector(".password-strength .progress-bar")
  const strengthText = document.getElementById("passwordStrength")

  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      const password = this.value
      let strength = 0
      let status = ""

      if (password.length >= 8) strength += 25
      if (password.match(/[a-z]+/)) strength += 25
      if (password.match(/[A-Z]+/)) strength += 25
      if (password.match(/[0-9]+/) || password.match(/[^a-zA-Z0-9]+/)) strength += 25

      strengthBar.style.width = strength + "%"

      if (strength <= 25) {
        strengthBar.className = "progress-bar bg-danger"
        status = "Too weak"
      } else if (strength <= 50) {
        strengthBar.className = "progress-bar bg-warning"
        status = "Weak"
      } else if (strength <= 75) {
        strengthBar.className = "progress-bar bg-info"
        status = "Medium"
      } else {
        strengthBar.className = "progress-bar bg-success"
        status = "Strong"
      }

      strengthText.textContent = status
    })
  }

  // Password confirmation validation
  const confirmPasswordInput = document.getElementById("confirmPassword")
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener("input", function () {
      if (this.value !== passwordInput.value) {
        this.setCustomValidity("Passwords do not match")
      } else {
        this.setCustomValidity("")
      }
    })
  }

  // Form validation
  const forms = document.querySelectorAll(".needs-validation")

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
          event.preventDefault()

          // Show loading spinner
          const submitBtn = form.querySelector('button[type="submit"]')
          const spinner = submitBtn.querySelector(".spinner-border")
          submitBtn.disabled = true
          spinner.classList.remove("d-none")

          // Simulate form submission (replace with actual API call)
          setTimeout(() => {
            submitBtn.disabled = false
            spinner.classList.add("d-none")

            if (form.id === "loginForm") {
              // Redirect to dashboard after login
              window.location.href = "user-dashboard.html"
            } else if (form.id === "registerForm") {
              // Show success modal
              const successModalElement = document.getElementById("successModal")
              document.getElementById("successModalTitle").textContent = "Registration Successful!"
              document.getElementById("successModalMessage").textContent =
                "Your account has been created successfully. You can now log in."

              // Initialize Bootstrap modal
              const successModal = new bootstrap.Modal(successModalElement)
              successModal.show()

              // Reset form and switch to login tab after closing modal
              successModalElement.addEventListener(
                "hidden.bs.modal",
                () => {
                  form.reset()
                  document.querySelector('.auth-tab[data-tab="login"]').click()
                },
                { once: true },
              )
            } else if (form.id === "forgotPasswordForm") {
              // Show success message for password reset
              document.getElementById("resetSuccess").classList.remove("d-none")
              form.reset()
            }
          }, 1500)
        }

        form.classList.add("was-validated")
      },
      false,
    )
  })
})

