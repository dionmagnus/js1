/**
 *Находит все ссылки на видео на YouTube
 *
 *@return array - массыв найденных ссылок
 */
function getYouTybeVideoTags() {
	let videoTitleLinks = document.querySelectorAll("a[id=video-title-link]");
  let videoLinks = [];
  for(item of videoTitleLinks)
  	videoLinks.push( "https://youtube.com" + item.getAttribute("href") );
  
  return videoLinks;
}
