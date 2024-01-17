// Navbar toogle

var home = document.getElementById("home");
home.addEventListener("click", function () {
  window.location.href = "/index.html";
});
var service = document.getElementById("service");
service.addEventListener("click", function () {
  window.location.href = "/templates/sevices/services.html";
});
var blog = document.getElementById("blog");
blog.addEventListener("click", function () {
  window.location.href = "/templates/blog/blog.html";
});
var Contact = document.getElementById("Contact");
Contact.addEventListener("click", function () {
  window.location.href = "/templates/contactTeam-form.html";
});

// For FAQ switch to close and open if user clicked
function toggleCollapse(clickedId) {
  var detailsElements = document.querySelectorAll("details");
  detailsElements.forEach(function (details) {
    if (details.id !== clickedId) {
      details.removeAttribute("open");
    }
  });
}

function handleSearch() {
  var userInput = document.getElementById("searchInput").value.toLowerCase();
  var faqList = document.getElementById("faqList");

  // Iterate through each FAQ item
  var faqItems = faqList.getElementsByTagName("details");
  for (var i = 0; i < faqItems.length; i++) {
    var summaryText = faqItems[i]
      .getElementsByTagName("summary")[0]
      .innerText.toLowerCase();
    var faqContent = faqItems[i]
      .getElementsByTagName("p")[0]
      .innerText.toLowerCase();

    // Check if the input matches the FAQ item's summary or content
    if (summaryText.includes(userInput) || faqContent.includes(userInput)) {
      faqItems[i].style.display = "block";
    } else {
      faqItems[i].style.display = "none";
    }
  }
}

function clearSearch() {
  // Clear the search input and show all FAQ items
  document.getElementById("searchInput").value = "";
  var faqItems = document
    .getElementById("faqList")
    .getElementsByTagName("details");
  for (var i = 0; i < faqItems.length; i++) {
    faqItems[i].style.display = "block";
  }
}

// CHATBOT SCRIPT
class Chatbox {
  constructor() {
    this.args = {
      openButton: document.querySelector(".chatbox__button"),
      chatBox: document.querySelector(".chatbox__support"),
      sendButton: document.querySelector(".send__button"),
    };

    this.state = false;
    this.messages = [];
  }

  display() {
    const { openButton, chatBox, sendButton } = this.args;

    openButton.addEventListener("click", () => this.toggleState(chatBox));

    sendButton.addEventListener("click", () => this.onSendButton(chatBox));

    const node = chatBox.querySelector("input");
    node.addEventListener("keyup", ({ key }) => {
      if (key === "Enter") {
        this.onSendButton(chatBox);
      }
    });
  }

  toggleState(chatbox) {
    this.state = !this.state;

    // To show or hide the chat box
    if (this.state) {
      chatbox.classList.add("chatbox--active");
    } else {
      chatbox.classList.remove("chatbox--active");
    }
  }

  onSendButton(chatbox) {
    var textField = chatbox.querySelector("input");
    let text1 = textField.value;
    if (text1 === "") {
      return;
    }

    let msg1 = { name: "User", message: text1 };
    this.messages.push(msg1);

    //http://127.0.0.1:5500/templates/base.html

    fetch($SCRIPT_ROOT + "/predict", {
      method: "POST",
      body: JSON.stringify({ message: text1 }),
      node: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        let msg2 = { name: "Sam", message: r.answer };
        this.messages.push(msg2);
        this.updateChatText(chatbox);
        textField.value = "";
      })
      .catch((erro) => {
        console.error("Error:", erro);
        this.updateChatText(chatbox);
        textField.value = "";
      });
  }

  updateChatText(chatbox) {
    var html = "";
    this.messages
      .slice()
      .reverse()
      .forEach(function (item) {
        if (item.name === "Sam") {
          html +=
            '<div class="messages__item messages__item--visitoe">' +
            item.message +
            "</div>";
        } else {
          html +=
            '<div class="messages__item messages__item--operator">' +
            item.message +
            "</div>";
        }
      });

    const chatmessage = chatbox.querySelector(".chatbox__messages");
    chatmessage.innerHTML = html;
  }
}

const chatbox = new Chatbox();
chatbox.display();
