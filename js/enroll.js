$(document).ready(() => {
  // Form validation
  $("#enrollmentForm").on("submit", (e) => {
    e.preventDefault()

    // Simple form validation
    let isValid = true
    const requiredFields = ["firstName", "lastName", "email", "phone"]

    requiredFields.forEach((field) => {
      const value = $(`#${field}`).val().trim()
      if (!value) {
        isValid = false
        $(`#${field}`).addClass("is-invalid")
      } else {
        $(`#${field}`).removeClass("is-invalid")
      }
    })

    if (!$("#termsCheck").is(":checked")) {
      isValid = false
      $("#termsCheck").addClass("is-invalid")
    } else {
      $("#termsCheck").removeClass("is-invalid")
    }

    if (isValid) {
      // Simulate form submission
      simulateFormSubmission()
    } else {
      // Show validation message
      showToast("Please fill in all required fields", "error")
    }
  })

  // Clear validation on input
  $(".form-control").on("input", function () {
    $(this).removeClass("is-invalid")
  })

  $("#termsCheck").on("change", function () {
    $(this).removeClass("is-invalid")
  })

  // Payment method selection animation
  $(".payment-method-btn").on("click", function () {
    $(".payment-method-btn").removeClass("active")
    $(this).addClass("active")
  })

  // Simulate form submission with loading state
  function simulateFormSubmission() {
    // Show loading state
    const submitBtn = $('#enrollmentForm button[type="submit"]')
    const originalText = submitBtn.html()
    submitBtn.html(
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...',
    )
    submitBtn.prop("disabled", true)

    // Simulate API call
    setTimeout(() => {
      // Reset button
      submitBtn.html(originalText)
      submitBtn.prop("disabled", false)

      // Show success message and redirect
      showToast("Enrollment details submitted successfully!", "success")

      // Simulate redirect to payment page
      setTimeout(() => {
        // In a real application, this would redirect to the payment page
        // window.location.href = 'payment.html';

        // For demo purposes, just update the progress indicator
        $(".progress-step:nth-child(3)").addClass("active")
        $(".progress-connector:nth-child(4)").addClass("active")
      }, 1500)
    }, 2000)
  }

  // Toast notification function
  function showToast(message, type = "info") {
    // Create toast container if it doesn't exist
    if ($("#toastContainer").length === 0) {
      $("body").append(
        '<div id="toastContainer" style="position: fixed; top: 20px; right: 20px; z-index: 9999;"></div>',
      )
    }

    // Set toast color based on type
    let bgColor = "bg-info"
    if (type === "success") bgColor = "bg-success"
    if (type === "error") bgColor = "bg-danger"

    // Create toast
    const toastId = "toast-" + Date.now()
    const toast = `
      <div id="${toastId}" class="toast ${bgColor} text-white" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">Notification</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          ${message}
        </div>
      </div>
    `

    // Add toast to container
    $("#toastContainer").append(toast)

    // Initialize and show toast
    const toastElement = new bootstrap.Toast(document.getElementById(toastId), {
      autohide: true,
      delay: 5000,
    })
    toastElement.show()
  }

  // Animate elements when they come into view
  function animateOnScroll() {
    $(".benefit-card, .testimonial-item").each(function () {
      const position = $(this).offset().top
      const scroll = $(window).scrollTop()
      const windowHeight = $(window).height()

      if (scroll + windowHeight > position + 100) {
        $(this).addClass("animate__animated animate__fadeInUp")
      }
    })
  }

  // Run animation on scroll
  $(window).scroll(() => {
    animateOnScroll()
  })

  // Run animation on page load
  animateOnScroll()
})

