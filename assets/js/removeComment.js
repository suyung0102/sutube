import axios from "axios";

const removeCommentForms = document.querySelectorAll(
  "button.remove__comment:not(.edit__video)"
);
const commentNumber = document.getElementById("jsCommentNumber");

const postRemoveComment = async (id) => {
  console.log(id);
  await axios({
    url: `/api/${id}/remove`,
    method: "POST",
    data: {
      id,
    },
  });
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

function removeCommentTag(event) {
  const parentsNode = event.path[3];
  const childNode = event.path[2];
  parentsNode.removeChild(childNode);
}

const removeComment = (event) => {
  event.preventDefault();
  const commentId = event.target.value;
  removeCommentTag(event);
  decreaseNumber();
  postRemoveComment(commentId);
};

function init() {
  removeCommentForms.forEach((comment) => {
    comment.addEventListener("click", removeComment);
  });
}

if (removeCommentForms) {
  init();
}
