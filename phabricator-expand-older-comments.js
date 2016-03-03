// ==UserScript==
// @name        Phabricator: expand old comments on load
// @namespace   org.mariospr.greasemonkey.phabricator
// @description Expand old comments by default in Phabricator Tasks
// @include     https://phabricator.wikimedia.org/T*
// @version     1
// @grant       none
// ==/UserScript==

function findShowOlderCommentsBlock(container) {
  let timeLineViewDiv = container.getElementById("UQ0_3");
  let timeLineNodes = timeLineViewDiv.childNodes;
  for (let i = 0; i < timeLineNodes.length; ++i) {
    let childNode = timeLineNodes[i];
    if (childNode.getAttribute("data-sigil") == "show-older-block") {
      return childNode;
    }
  }
  return null;
}

function findShowOlderCommentsLink(container) {
  let links = container.getElementsByTagName("a");
  for (let i = 0; i < links.length; ++i) {
    if (links[i].getAttribute("data-sigil") == "show-older-link") {
      return links[i];
    }
  }
  return null;
}

function expandOlderComments() {
  let showCommentsBlock = findShowOlderCommentsBlock(document);
  if (!showCommentsBlock)
    return;

  let showCommentsLink = findShowOlderCommentsLink(showCommentsBlock);
  if (!showCommentsLink)
    return;

  let mouseEvent = document.createEvent("MouseEvents");
  mouseEvent.initEvent("click", true, true);
  showCommentsLink.dispatchEvent(mouseEvent);
}

// We need to wait for the document to load before expanding the
// comments or the result we'll get won't be quite what we expect.
document.body.onload = expandOlderComments;
