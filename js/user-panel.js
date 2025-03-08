$(document).ready(() => {
  // Navigation between sections
  $(".nav-link[data-section], .btn-link[data-section]").click(function (e) {
    e.preventDefault()
    const targetSection = $(this).data("section")

    // Update active nav link
    $(".nav-link").removeClass("active")
    $(`.nav-link[data-section="${targetSection}"]`).addClass("active")

    // Show target section, hide others
    $(".content-section").removeClass("active")
    $(`#${targetSection}`).addClass("active")
  })

  // Course search functionality
  $("#courseSearch").on("keyup", function () {
    const value = $(this).val().toLowerCase()
    $("#courseList .col-md-6").filter(function () {
      const matches = $(this).text().toLowerCase().indexOf(value) > -1
      $(this).toggle(matches)
    })
  })

  // Course filters
  $("#statusFilter, #categoryFilter, #sortFilter").on("change", () => {
    filterCourses()
  })

  function filterCourses() {
    const status = $("#statusFilter").val()
    const category = $("#categoryFilter").val()

    $("#courseList .col-md-6").each(function () {
      const $course = $(this)
      const courseStatus = $course.data("status")
      const courseCategory = $course.data("category")

      const statusMatch = status === "all" || courseStatus === status
      const categoryMatch = category === "all" || courseCategory === category

      $course.toggle(statusMatch && categoryMatch)
    })

    // Sort courses
    const sortBy = $("#sortFilter").val()
    const $courseContainer = $("#courseList")
    const $courses = $courseContainer.children(".col-md-6").get()

    $courses.sort((a, b) => {
      if (sortBy === "name") {
        return $(a).find(".card-title").text().localeCompare($(b).find(".card-title").text())
      } else if (sortBy === "progress") {
        return $(b).find(".progress-text").text().replace("%", "") - $(a).find(".progress-text").text().replace("%", "")
      } else {
        // Default: recent
        return 0 // No sorting
      }
    })

    $.each($courses, (i, course) => {
      $courseContainer.append(course)
    })
  }

  // Simple calendar initialization
  function initCalendar() {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    let calendarHTML = '<table class="table mb-0">'
    calendarHTML += "<thead><tr>"
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    for (let i = 0; i < 7; i++) {
      calendarHTML += `<th>${days[i]}</th>`
    }
    calendarHTML += "</tr></thead><tbody>"

    let date = 1
    for (let i = 0; i < 6; i++) {
      calendarHTML += "<tr>"
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          calendarHTML += "<td></td>"
        } else if (date > daysInMonth) {
          calendarHTML += "<td></td>"
        } else {
          const isToday = date === today.getDate()
          const hasEvent = [15, 18, 22].includes(date) // Example event dates
          const cellClass = isToday ? "today" : hasEvent ? "has-event" : ""

          calendarHTML += `<td class="${cellClass}">${date}</td>`
          date++
        }
      }
      calendarHTML += "</tr>"
      if (date > daysInMonth) {
        break
      }
    }

    calendarHTML += "</tbody></table>"
    $("#calendar").html(calendarHTML)
  }

  initCalendar()

  // Initialize DataTables for invoice table
  $(".invoice-table").DataTable({
    paging: false,
    searching: false,
    info: false,
  })

  // Zoom modal functionality
  $("#zoomModal").on("shown.bs.modal", () => {
    // Could add functionality to copy Zoom details to clipboard
  })

  // Course details modal functionality
  $("#courseDetailsModal").on("show.bs.modal", function (event) {
    const button = $(event.relatedTarget)
    const courseTitle = button.closest(".card").find(".card-title").text()
    const modal = $(this)

    modal.find(".modal-title").text("Course Details: " + courseTitle)
    // In a real app, you would load course details via AJAX here
  })

  // Message form submission
  $(".message-form").submit(function (e) {
    e.preventDefault()
    const messageInput = $(this).find('input[type="text"]')
    const messageText = messageInput.val().trim()

    if (messageText) {
      const newMessage = `
        <div class="message sent">
          <div class="message-content">
            <p>${messageText}</p>
          </div>
          <div class="message-time">Just now</div>
        </div>
      `

      $(".message-body").append(newMessage)
      messageInput.val("")

      // Scroll to bottom of message body
      $(".message-body").scrollTop($(".message-body")[0].scrollHeight)

      // In a real app, you would send the message to the server here

      // Simulate a response after 1 second
      setTimeout(() => {
        const responseMessage = `
          <div class="message received">
            <div class="message-content">
              <p>Thanks for your message! I'll get back to you soon.</p>
            </div>
            <div class="message-time">Just now</div>
          </div>
        `

        $(".message-body").append(responseMessage)
        $(".message-body").scrollTop($(".message-body")[0].scrollHeight)
      }, 1000)
    }
  })

  // Settings tabs
  $(".settings-nav a").on("click", function (e) {
    e.preventDefault()
    $(this).tab("show")
  })

  // Mobile sidebar toggle
  $(".navbar-toggler").on("click", () => {
    $("#sidebar").toggleClass("show")
  })

  // Responsive adjustments
  function checkWidth() {
    if ($(window).width() < 768) {
      $("#sidebar").addClass("collapse")
    } else {
      $("#sidebar").removeClass("collapse show")
    }
  }

  // Check width on page load
  checkWidth()

  // Check width on window resize
  $(window).resize(checkWidth)
})

