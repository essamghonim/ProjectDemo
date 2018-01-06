
    var Preview = false;
   if (window.location.href.toString().includes("preview=true"))
   {
      ////console.log("Here is the windew ref " + window.location.href);
      sessionStorage.setItem("Development", "true");
      document.getElementById("sidemenu").style.display = "none";
      SetAllTextToNonEditable();
      Preview = true;
   }
   else
   {
      SetAllTextToEditable();
      sessionStorage.setItem("Development", "false");
      Preview = false;
   }
  if (document.addEventListener) 
  {
        document.addEventListener('contextmenu', function(event) 
        {
              //alert("You've tried to open context menus"); //here you draw your own menu
              //////////////////////console.log("Here is the event " + event.target.nodeName);
              if (!Preview)
              {
                ShowRightClick(event);
              }
              event.preventDefault();

        }, false);
    } 
    else 
    {
        document.attachEvent('oncontextmenu', function(event) 
        {
              if (!Preview)
              {
                ShowRightClick(event);
              }
              window.event.returnValue = false;
        });
    }
    function SetAllTextToEditable()
    {
        var PermissionBool = true;
        $(document).ready(function () 
        {
            $("h1, h2, h3, h4, h5, h6, p, a, strong, li").each(function(index, k) 
            {
                  PermissionBool = true;
                  var a = k;
                  var els = [];
                  while (a) 
                  {
                      els.unshift(a);
                      a = a.parentNode;
                      if (a)
                      {
                        if (a.id == "sidemenu")
                        {
                           PermissionBool = false;
                        }
                      }
                  }
                  //////console.log("Here is the permission " + PermissionBool);
                  if (PermissionBool)
                  {
                    k.setAttribute("contenteditable", "true");
                    k.contentEditable = true;
                  }
            });
        });
    }
    function SetAllTextToNonEditable()
    {
        ////console.log("SetAllTextToNonEditable");
        $(document).ready(function () 
        {
            $("h1, h2, h3, h4, h5, h6, p, a, strong, li").each(function(index, k) 
            {
                k.setAttribute("contenteditable", "false");
                k.contentEditable = false;
            });
            $('*[id*=Youtube]:visible, *[id*=Dailymotion]:visible, *[id*=Facebook]:visible, *[id*=Vimeo]:visible').each(function(index, element) 
            {
                if (element.id.includes("Facebook"))
                {
                  var id = element.id.toString();
                  id = id.substring(id.length-2, id.length);
                  if (id == "12")
                  {
                    element.style.pointerEvents = "auto";
                  }
                }
                else if (element.nodeName.includes("IFRAME"))
                {
                    element.style.pointerEvents = "auto";
                }
            });
        });
    }
    function ShowRightClick(event)
    {
        WhichMenuShouldAppear = 1;
        var PermissionBool = true;
        var text = $(event.target).text();
        var element = $(event.target).position();
        if (event.target.id.toString() == null || event.target.id.toString() == "")
        {
          event.target.id = "ChosenItemForEditting" + event.clientX + event.clientY;
        }
        var a = document.getElementById(event.target.id.toString());
        var els = [];
        while (a) 
        {
            els.unshift(a);
            a = a.parentNode;
            if (a)
            {
              if (a.id == "sidemenu")
              {
                 PermissionBool = false;
              }
            }
        }
        if ((event.target.nodeName.toString().includes("H") || event.target.nodeName.toString().includes("P")) && PermissionBool)
        {
            ChosenIDForEditting = event.target.id;
            EdittingTextID = event.target.id;
            HideAllBoxes();
            document.getElementById('EditTextButtonAndMenuForRightClick').style.display = 'block';
            document.getElementById('EditTextButtonAndMenuForRightClick').style.left = (event.clientX-100) + "px";
            if ((event.clientY+40+600) > screen.height)
            {
                 document.getElementById('EditTextButtonAndMenuForRightClick').style.top = (screen.height-550) + "px";
            }
            else
            {
                 document.getElementById('EditTextButtonAndMenuForRightClick').style.top = (event.clientY+40) + "px";
            }
            document.getElementById('EditImageButtonAndMenuForRightClick').style.display = 'none';
        }
        else if (event.target.nodeName.toString().includes("IMG") && PermissionBool)
        {
            ChosenIDForEditting = event.target.id;
            EdittingImageID = event.target.id;
            document.getElementById('edittedimage').src = document.getElementById(EdittingImageID).src;
            HideAllBoxes();
            document.getElementById('EditImageButtonAndMenuForRightClick').style.display = 'block';
            document.getElementById('EditImageButtonAndMenuForRightClick').style.left = (event.clientX-200) + "px";
            if ((event.clientY+40+600) > screen.height)
            {
                 document.getElementById('EditImageButtonAndMenuForRightClick').style.top = (screen.height-600) + "px";
            }
            else
            {
                 document.getElementById('EditImageButtonAndMenuForRightClick').style.top = (event.clientY+40) + "px";
            }
            document.getElementById('EditTextButtonAndMenuForRightClick').style.display = 'none';
        }
        else
        {
            document.getElementById('EditTextButtonAndMenu').style.display = "none";
            document.getElementById('EditDivButtonAndMenu').style.display = "none";
            document.getElementById('EditReOrderButtonAndMenu').style.display = "none";
            document.getElementById('EditImageButtonAndMenu').style.display = "none";
            document.getElementById('EditButtonAndMenu').style.display = "none";
            document.getElementById('EditTextButtonAndMenuForRightClick').style.display = "none";
            document.getElementById('EditImageButtonAndMenuForRightClick').style.display = 'none';
        }
    }
  var xhr= new XMLHttpRequest();
  xhr.open('GET', '../../sidebar.html', true);
  xhr.onreadystatechange= function() 
  {
      if (this.readyState!==4) return;
      if (this.status!==200) return; // or whatever error handling you want
      document.getElementById('sidemenu').innerHTML= this.responseText;
      SetUpFileInput();
      reloadAllSelects();
      AllQueriesFunction();
      GetWebsiteContent();
      setTimeout(CheckIfNewPageIsAdded, 1000);
  };
  xhr.send();
  function SetUpFileInput()
  {
      window.URL    = window.URL || window.webkitURL;
      var elBrowse  = document.getElementById("fileInput"), useBlob   = false && window.URL;
        elBrowse.addEventListener("change", function() 
        {
          var files  = this.files;
          var errors = "";

          if (!files) 
          {
            errors += "File upload not supported by your browser.";
          }
          if (files && files[0]) 
          {
            for(var i=0; i<files.length; i++) 
            {
              var file = files[i];
              if ( (/\.(png|jpeg|jpg|gif)$/i).test(file.name) ) 
              {
                  readImage(file); 
              } 
              else 
              {
                  errors += file.name +" Unsupported Image extension\n";  
              }
            }
          }
          if (errors) 
          {
            alert(errors); 
          }
      });
  }
  function upload(file, id)
  {
        //////////////////////////////////////console.log("Uploading file to Imgur..");
        var apiUrl = 'https://api.imgur.com/3/image';
        var settings = {
          async: false,
          crossDomain: true,
          processData: false,
          contentType: false,
          type: 'POST',
          url: apiUrl,
          headers: {
            Authorization: 'Client-ID c485636c010d594',
            Accept: 'application/json'
          },
          mimeType: 'multipart/form-data'
        };
        var formData = new FormData();
        formData.append("image", file);
        settings.data = formData;
        $.ajax(settings).done(function(response) {
          //////////////////////////////////////console.log(response);
          var data = JSON.parse(response);
          var Link = data['data']['link'];
          console.log("Here is the link " + Link);
          SaveImageToServer(Link);
          document.getElementById(id).src = Link;
        });
  }
  function readImage (file) 
  {
    //////////////////////////////////////console.log("Here is the image");
    var useBlob;
    var reader = new FileReader();
    reader.addEventListener("load", function () 
    {
        var image  = new Image();
        image.addEventListener("load", function () 
        {
          var imageInfo = file.name + ' ' + // get the value of `name` from the `file` Obj
              image.width  +'×'+ // But get the width from our `image`
              image.height +' '+
              file.type    +' '+
              Math.round(file.size/1024) +'KB'; 
          if (useBlob) 
          {
            window.URL.revokeObjectURL(image.src);
          }
        });
        image.src = useBlob ? window.URL.createObjectURL(file) : reader.result;
        var imageDiv = document.getElementById('OurImagesForUploadBox');
          var Addedimage = document.createElement("img");
          Addedimage.src = image.src;
          Addedimage.onclick = function(){ PickImage(Addedimage); };
          var randomID = Math.random().toString();
          Addedimage.id = "work" + randomID.substring(2, randomID.length);
          imageDiv.appendChild(Addedimage);
          upload(file, Addedimage.id);
      });
      reader.readAsDataURL(file);
  }
  function SaveImageToServer(src)
  {
        $.ajax({
            url: '../../api/SaveImageToAccount',
            type: 'GET',
        headers: {
            "Email" : sessionStorage.getItem('email'),
            "Image" : src,
            'token': sessionStorage.getItem('token')
        },
        cache: false,
        dataType: 'json',
            success: function(response) {
                //////////////////////////////////////console.log("Here is the response 2 " + JSON.stringify(response));
            }
        });
  }
  function LoadAllImagesFromServer()
  {
      ////console.log("Here is the token " + sessionStorage.getItem('token'));
      ////console.log("Here is the email " + sessionStorage.getItem('email'));
        $.ajax({
            url: '../../api/GetImages',
            headers: { 'token': sessionStorage.getItem('token'), 'Email': sessionStorage.getItem('email')},
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function(response) {
                var status = response['status'];
                //////console.log("Here is the repsonse " + JSON.stringify(response));
                if (status == 200)
                {
                  var ImageArray = JSON.parse(response['images']);
                  sessionStorage.setItem('ImagesUploadedBox', "");
                  for (var i = 0; i < ImageArray.length; i++) 
                  {
                    var imageDiv = document.getElementById('OurImagesForUploadBox');
                    var Addedimage = document.createElement("img");
                    Addedimage.src = ImageArray[i];
                    Addedimage.onclick = function(){ PickImage(this); };
                    var randomID = Math.random().toString();
                    Addedimage.id = "work" + randomID.substring(2, randomID.length);
                    imageDiv.appendChild(Addedimage);
                    //var imageDiv = document.getElementById('UploadedImagesforSideMenu');
                    var NewDiv = document.createElement("div");
                    //<img src='../../images/work_1.jpg' id='dragwork1' draggable='true' ondragstart='drag_start(event)'>
                    var Newimage = document.createElement("img");
                    Newimage.src = ImageArray[i];
                    var randomID = Math.random().toString();
                    Newimage.id = "dragwork" + randomID.substring(2, randomID.length);
                    Newimage.draggable = true;
                    Newimage.setAttribute('ondragstart','drag_start(event)'); 
                    NewDiv.appendChild(Newimage);
                    sessionStorage.setItem('ImagesUploadedBox', sessionStorage.getItem('ImagesUploadedBox') + NewDiv.innerHTML.toString());
                    ////////console.log("Here is the inner html " + NewDiv.innerHTML);

                  }
                  if (ImageArray.length == 0)
                  {
                      sessionStorage.setItem('ImagesUploadedBox', "<p>No Images Uploaded</p>");
                  }
                  EditAllSelectedImages('');
                }
                else
                {
                    sessionStorage.setItem('ImagesUploadedBox', "<p>No Images Uploaded</p>");
                }
            }
        });
  }
  LoadAllImagesFromServer();
  function EditAllSelectedImages(ID)
  {
    $("div#OurImagesForUploadBox > *").each(function(index, k) 
    {
      if (k.id == ID)
      {
        document.getElementById(k.id).style.border = "2px solid #2D4150";
      }
      else
      {
        document.getElementById(k.id).style.border = "2px solid #ffffff";
      }
    });
  }
   function chooseFile() 
   {
      $("#fileInput").click();
   }
  function ChooseImageToAddToPage()
  {
    ////////////////////////////////////////console.log("Here is the chosen image " + EdittingImageID);
    ////////////////////////////////////////console.log("Here is the chosen source " + ChangedImageSource);
    CloseBox();
    if (document.getElementById('choosebuttonforimages').value == "Choose Image")
    {
      SaveImageSrcBeforeChanges(EdittingImageID);
      document.getElementById(EdittingImageID).src = ChangedImageSource;
    }
    else
    {
      ////////////////////////////////////////console.log("Should add image to page");
    }
  }
  function findIndex(node)
  {
      var i = 1;
      while (node = node.previousSibling) {
          if (node.nodeType === 1) { ++i }
      }
      return i;
  }
  function AddSection()
  {
    if (ChosenIDForEditting != null && ChosenIDForEditting != "" && ChosenIDForEditting != "DraggingfromMenu")
    {
        if (WhichElement == "Div")
        {
              var Check = false;
              var element = document.getElementById(EdittingDivID);
              var ID = Math.random().toString();
              if (element.parentNode.id == null || element.parentNode.id == "")
              {
                Check = true;
                element.parentNode.id = "newId" + ID.substring(4, ID.length);
              }
              $("#" + EdittingDivID).resizable({ disabled: true });
              $("#" + EdittingDivID).resizable('destroy');
              var nodeCopy = document.getElementById(EdittingDivID).cloneNode(true);
              if (Check)
              {
                nodeCopy.id = "newId" + ID.substring(2, ID.length);
              }
              else
              {
                nodeCopy.id = element.id;
              }
              var i = findIndex(document.getElementById(EdittingDivID));
              if (element.parentNode.children.length > i-1 && i > 0)
              {
                  element.parentNode.insertBefore(nodeCopy, element.parentNode.children[i-1]);
              }
              else
              {
                  element.parentNode.appendChild(nodeCopy);
              }
              SaveAddedItemBeforeChanges(element.parentNode.id, nodeCopy.outerHTML);
        }
    }
  }
  function BringItUpper()
  {
      if (ChosenIDForEditting != null && ChosenIDForEditting != "" && ChosenIDForEditting != "DraggingfromMenu")
      {
          if (WhichElement == "Div")
          {
                var element = document.getElementById(EdittingDivID);
                var ID = Math.random().toString();
                if (element.parentNode.id == null || element.parentNode.id == "")
                {
                  element.parentNode.id = "newId" + ID.substring(4, ID.length);
                }
                var i = findIndex(document.getElementById(EdittingDivID));
                if (element.parentNode.children.length > i-1 && i > 0)
                {
                    element.parentNode.insertBefore(element.parentNode.children[i-1], element.parentNode.children[i-2]);
                }
                //SaveAddedItemBeforeChanges(element.parentNode.id, nodeCopy.outerHTML);
          }
      }
  }
  function BringItLower()
  {
      if (ChosenIDForEditting != null && ChosenIDForEditting != "" && ChosenIDForEditting != "DraggingfromMenu")
      {
          if (WhichElement == "Div")
          {
                var element = document.getElementById(EdittingDivID);
                var ID = Math.random().toString();
                if (element.parentNode.id == null || element.parentNode.id == "")
                {
                  element.parentNode.id = "newId" + ID.substring(4, ID.length);
                }
                var i = findIndex(document.getElementById(EdittingDivID));
                if (element.parentNode.children.length > i-1 && i > 0)
                {
                    element.parentNode.insertBefore(element.parentNode.children[i], element.parentNode.children[i-1]);
                }
                //SaveAddedItemBeforeChanges(element.parentNode.id, nodeCopy.outerHTML);
          }
      }
  }
  function DeleteItem(element)
  {
    ////////////////////////console.log("Here is the element ID " + element.id);
    if (WhichElement == "Text")
    {
      var element = document.getElementById(EdittingTextID);
      SaveRemovedItemBeforeChanges(element.parentNode.id, EdittingTextID);
      element.parentNode.removeChild(element);
    }
    else if (WhichElement == "Image")
    {
      var element = document.getElementById(EdittingImageID);
      SaveRemovedItemBeforeChanges(element.parentNode.id, EdittingImageID);
      element.parentNode.removeChild(element);
    }
    else if (WhichElement == "Button")
    {
      var element = document.getElementById(EdittingButtonID);
      SaveRemovedItemBeforeChanges(element.parentNode.id, EdittingButtonID);
      element.parentNode.removeChild(element);
    }
    else if (WhichElement == "Div")
    {
      var element = document.getElementById(EdittingDivID);
      SaveRemovedItemBeforeChanges(element.parentNode.id, EdittingDivID);
      element.parentNode.removeChild(element);
    }
  }
  function DeleteVideo(element)
  {
    ////////////////////////console.log("Here is the element ID " + element.id);
    var element = document.getElementById(EdittingVideoID).parentNode;
    SaveRemovedItemBeforeChanges(element.parentNode.id, EdittingVideoID);
    element.parentNode.removeChild(element);
  }
  function ChangeImage()
  {
    document.getElementById('choosebuttonforimages').value = "Choose Image";
    HideAllBoxes();
    document.getElementById('UploadedImagesAndVideos').style.display = "block";
    ShowEditButton = true;
    ////////////////////////////////console.log("Here is the ID " + EdittingImageID);
    $(function() 
      {
        $("#" + EdittingImageID).resizable();
      });
  }
  function ResizeImage()
  {
      ////////////////console.log("EdittingImageID " + EdittingImageID);
      CreateResizeButtons();
      document.getElementById(EdittingImageID).setAttribute('draggable', 'false');
      $("#" + EdittingImageID).resizable({ disabled: false });
      $("#" + EdittingImageID).resizable({
          stop: function(event, ui) {
              var w = ui.size.width;
              var h = ui.size.height;
              ////////console.log("Here is the widtth " + w);
          },
          resize : function(event,ui) 
          {
              var w = ui.size.width;
              var h = ui.size.height;
              var image = document.getElementById('ResizeImageID');
              image.style.top = ($('#' + EdittingImageID).height() + $('#' + EdittingImageID).position().top - 10) + "px";
              image.style.left = ($('#' + EdittingImageID).width() + $('#' + EdittingImageID).position().left) + "px";
              image = document.getElementById('ResizeImageID2');
              image.style.top = ($('#' + EdittingImageID).position().top - 5) + "px";
              image.style.left = ($('#' + EdittingImageID).position().left) + "px";
              image = document.getElementById('ResizeImageID3');
              image.style.top = ($('#' + EdittingImageID).height() + $('#' + EdittingImageID).position().top - 10) + "px";
              image.style.left = ($('#' + EdittingImageID).position().left) + "px";
              image = document.getElementById('ResizeImageID4');
              image.style.top = ($('#' + EdittingImageID).position().top - 5) + "px";
              image.style.left = ($('#' + EdittingImageID).width() + $('#' + EdittingImageID).position().left) + "px";
          }
      });
  }
  function ResizeVideo()
  {
      ////////////////console.log("EdittingImageID " + EdittingImageID);
      CreateResizeButtons();
      document.getElementById(EdittingVideoID).style.display = "none";
      var element = document.getElementById(EdittingVideoID).parentNode;
      $("#" + element.id).resizable({ disabled: false });
      $("#" + element.id).resizable({
          stop: function(event, ui) {
              var w = ui.size.width;
              var h = ui.size.height;
              ////////console.log("Here is the widtth " + w);
          },
          resize : function(event,ui) 
          {
              var w = ui.size.width;
              var h = ui.size.height;
              var image = document.getElementById('ResizeImageID');
              image.style.top = (parseInt(document.getElementById(EdittingVideoID).parentNode.style.height, 10) + parseInt(document.getElementById(EdittingVideoID).parentNode.style.top, 10) - 10) + "px";
              image.style.left = (parseInt(document.getElementById(EdittingVideoID).parentNode.style.width, 10) + parseInt(document.getElementById(EdittingVideoID).parentNode.style.left, 10) - 10) + "px";
              image = document.getElementById('ResizeImageID2');
              image.style.top = (parseInt(document.getElementById(EdittingVideoID).parentNode.style.top, 10) - 5) + "px";
              image.style.left = (parseInt(document.getElementById(EdittingVideoID).parentNode.style.left, 10) - 5) + "px";
              image = document.getElementById('ResizeImageID3');
              image.style.top = (parseInt(document.getElementById(EdittingVideoID).parentNode.style.height, 10) + parseInt(document.getElementById(EdittingVideoID).parentNode.style.top, 10) - 10) + "px";
              image.style.left = (parseInt(document.getElementById(EdittingVideoID).parentNode.style.left, 10) - 5) + "px";
              image = document.getElementById('ResizeImageID4');
              image.style.top = (parseInt(document.getElementById(EdittingVideoID).parentNode.style.top, 10) - 5) + "px";
              image.style.left = (parseInt(document.getElementById(EdittingVideoID).parentNode.style.width, 10) + parseInt(document.getElementById(EdittingVideoID).parentNode.style.left, 10) - 10) + "px";
          }
      });
  }
  function CreateResizeButtons()
  {
      var element = document.getElementById(EdittingButtonID);
      if (WhichElement == "Image")
      {
          element = document.getElementById(EdittingImageID);
      }
      else if (WhichElement == "Button")
      {
          element = document.getElementById(EdittingButtonID);
      }
      else if (WhichElement == "Video")
      {
          element = document.getElementById(EdittingVideoID).parentNode;
      }
      var image = document.createElement('img');
      image.src = '../../images/SideBar/Resize.png';
      image.style.cssText = "pointer-events: none; position: absolute; width: 15px;height: 15px; z-index: 91;";
      image.style.top = ($('#' + element.id).height() - 18) + "px";
      image.style.left = ($('#' + element.id).width() - 15) + "px";
      image.id = "ResizeImageID";
      var image2 = document.createElement('img');
      image2.src = '../../images/SideBar/Resize.png';
      image2.style.cssText = "pointer-events: none; position: absolute; width: 15px;height: 15px; z-index: 91;";
      image2.style.top = "0px";
      image2.style.left = "0px";
      image2.id = "ResizeImageID2";
      var image3 = document.createElement('img');
      image3.src = '../../images/SideBar/Resize.png';
      image3.style.cssText = "pointer-events: none; position: absolute; width: 15px;height: 15px; z-index: 91;";
      image3.style.top = ($('#' + element.id).height() - 18) + "px";
      image3.style.left = "0px";
      image3.id = "ResizeImageID3";
      var image4 = document.createElement('img');
      image4.src = '../../images/SideBar/Resize.png';
      image4.style.cssText = "pointer-events: none; position: absolute; width: 15px;height: 15px; z-index: 91;";
      image4.style.top = "0px";
      image4.style.left = ($('#' + element.id).width() - 15) + "px";
      image4.id = "ResizeImageID4";
      if (WhichElement == "Button")
      {
          element.appendChild(image);
          element.appendChild(image2);
          element.appendChild(image3);
          element.appendChild(image4);
      }
      else if (WhichElement == "Image" || WhichElement == "Video")
      {
          image.style.top = ($('#' + element.id).height() + $('#' + element.id).position().top - 10) + "px";
          image.style.left = ($('#' + element.id).width() + $('#' + element.id).position().left - 10) + "px";

          image2.style.top = ($('#' + element.id).position().top - 5) + "px";
          image2.style.left = ($('#' + element.id).position().left - 5) + "px";

          image3.style.top = ($('#' + element.id).height() + $('#' + element.id).position().top - 10) + "px";
          image3.style.left = ($('#' + element.id).position().left - 5) + "px";

          image4.style.top = ($('#' + element.id).position().top - 5) + "px";
          image4.style.left = ($('#' + element.id).width() + $('#' + element.id).position().left - 10) + "px";
          element.parentNode.appendChild(image);
          element.parentNode.appendChild(image2);
          element.parentNode.appendChild(image3);
          element.parentNode.appendChild(image4);
      }
  }
  function DeleteResizeButtons()
  {
      if (WhichElement == "Image")
      {
          var element = document.getElementById(EdittingImageID);
          //////console.log("Here is the number " + element.parentNode.querySelector("#ResizeImageID"));
          if (element.parentNode.querySelector("#ResizeImageID") != null)
          {
              element.parentNode.removeChild(document.getElementById('ResizeImageID'));
              element.parentNode.removeChild(document.getElementById('ResizeImageID2'));
              element.parentNode.removeChild(document.getElementById('ResizeImageID3'));
              element.parentNode.removeChild(document.getElementById('ResizeImageID4'));
          }
      }
      else if (WhichElement == "Video")
      {
          var element = document.getElementById(EdittingVideoID).parentNode;
          //////console.log("Here is the number " + element.parentNode.querySelector("#ResizeImageID"));
          if (element.parentNode.querySelector("#ResizeImageID") != null)
          {
              element.parentNode.removeChild(document.getElementById('ResizeImageID'));
              element.parentNode.removeChild(document.getElementById('ResizeImageID2'));
              element.parentNode.removeChild(document.getElementById('ResizeImageID3'));
              element.parentNode.removeChild(document.getElementById('ResizeImageID4'));
          }
      }
      else if (WhichElement == "Button")
      {
          var element = document.getElementById(EdittingButtonID);
          if (element.querySelector("#ResizeImageID") != null)
          {
              element.removeChild(document.getElementById('ResizeImageID'));
              element.removeChild(document.getElementById('ResizeImageID2'));
              element.removeChild(document.getElementById('ResizeImageID3'));
              element.removeChild(document.getElementById('ResizeImageID4'));
          }
      }
  }
  function ResizeButton()
  {
      CreateResizeButtons();
      document.getElementById(EdittingButtonID).setAttribute('draggable', 'false');
      $("#" + EdittingButtonID).resizable({ disabled: false });
      //$("#" + EdittingButtonID).resizable();
      $("#" + EdittingButtonID).resizable({
          stop: function(event, ui) {
              var w = ui.size.width;
              var h = ui.size.height;
              ////////console.log("Here is the widtth " + w);
          },
          resize : function(event,ui) 
          {
              var w = ui.size.width;
              var h = ui.size.height;
              var image = document.getElementById('ResizeImageID');
              image.style.top = (parseInt(document.getElementById(EdittingButtonID).style.height, 10) - 18) + "px";
              image.style.left = (parseInt(document.getElementById(EdittingButtonID).style.width, 10) - 15) + "px";
              image = document.getElementById('ResizeImageID3');
              image.style.top = (parseInt(document.getElementById(EdittingButtonID).style.height, 10) - 18) + "px";
              image.style.left = "0px";
              image = document.getElementById('ResizeImageID4');
              image.style.top = "0px";
              image.style.left = (parseInt(document.getElementById(EdittingButtonID).style.width, 10) - 15) + "px";
          }
      });
  }
  function PickImage(element)
  {
    ////////////////////////////////////////console.log(element.id);
    element.style.border = "2px solid #2D4150";
    ChangedImageSource = element.src;
    EditAllSelectedImages(element.id);
    //////////////////////////////////////console.log("Here is the id " + element.id);
  }
  var AlertText = "";
  var EdittingTextID = "";
  var EdittingImageID = "";
  var ChangedImageSource = "";
  var DraggedID = "";
  var EdittingButtonID = "";
  var EdittingDivID = "";
  var AddElementToPage = false;
  var ShowEditButton = false;
  function showAddButtonMenu()
  {
    ChosenIDForEditting = "DraggingfromMenu";
    HideAllBoxes();
    document.getElementById('sidemenubox').style.display = "block";
  }
  function showUploadButtonMenu()
  {
    ChosenIDForEditting = "DraggingfromMenu";
    HideAllBoxes();
    document.getElementById('sidemenuforuploads').style.display = "block";
  }
  function ShowUploadMenu(check)
  {
        //////////////////////////////////////////////console.log("Here is the response check " + check);
        if (check == 'image')
        {
            HideAllBoxes();
            document.getElementById('UploadedImagesAndVideos').style.display = "block";
            document.getElementById('choosebuttonforimages').value = "Add To Page";
            ShowEditButton = true;
        }
        else
        {
            window.open('/Templates/1/index.html?preview=true');
        }
  }
  function showAddPageButtonMenu()
  {
    HideAllBoxes();
    document.getElementById('sidemenuforpagemenu').style.display = "block";
    ShowEditButton = true;
  }
  function CloseBox()
  {
    document.getElementById('sidemenubox').style.display = "none";
    document.getElementById('sidemenuforuploads').style.display = "none";
    document.getElementById('UploadedImagesAndVideos').style.display = "none";
    document.getElementById('EditTextBoxMenu').style.display = "none";
    document.getElementById('EditImageBoxMenu').style.display = "none";
    document.getElementById('sidemenuforpagemenu').style.display = "none";
    document.getElementById('EditVideoBoxMenu').style.display = "none";
    document.getElementById('EditButtonBoxMenu').style.display = "none";
    document.getElementById('sidemenuforpagemenuSettings').style.display = "none";
    ShowEditButton = false;
  }
  function HidePageSettings()
  {
    document.getElementById('sidemenuforpagemenuSettings').style.display = "none";
  }
  function AddNewBlankPageFromSideMenu()
  {
    sessionStorage.setItem('NameOfPage', "New Page " + (parseInt(document.getElementById("ListForContentOfPagesForSideMenu").getElementsByTagName("li").length) + 1));
    sessionStorage.setItem('AddedNewPage', 'true');
    sessionStorage.setItem('AddedNewTab', 'true');
    document.location = "indexEditBlank.html";
  }
  function AddNewTemplatePageFromSideMenu()
  {
    sessionStorage.setItem('NameOfPage', "New Page " + (parseInt(document.getElementById("ListForContentOfPagesForSideMenu").getElementsByTagName("li").length) + 1));
    sessionStorage.setItem('AddedNewPage', 'true');
    sessionStorage.setItem('AddedNewTab', 'true');
    document.location = "index.html";
  }
  function CheckIfNewPageIsAdded()
  {
      if (sessionStorage.getItem('AddedNewPage') == "true")
      {
          var string = document.getElementById("WholeWebsite").outerHTML;
          var compressed = LZW.compress(string);
          sessionStorage.setItem('AddedNewPage', '');
          $.ajax({
              url: '../../api/CreateNewPage',
              type: 'GET',
              data: {
                  "Email" : sessionStorage.getItem('email'),
                  "Page" : sessionStorage.getItem('EditingPage'),
                  "PageName" : sessionStorage.getItem('NameOfPage'),
                  "WebName" : sessionStorage.getItem('PageName'),
                  "HTML" : compressed,
                  'token': sessionStorage.getItem('token')
              },
              cache: false,
              dataType: 'json',
              success: function(response) {
                  //var status = response['status'];
                  ////console.log("Resposne1 " + JSON.stringify(response));
                  ////console.log(sessionStorage.getItem('NameOfPage'));
              }
          });
      }
  }
  function allowDrop(ev) 
  {
      ev.preventDefault();
  }
  function drag(ev) 
  {
      //ev.dataTransfer.setData("id", ev.target.id);
      DraggedID = ev.target.id;

      var style = window.getComputedStyle(event.target, null);
      event.dataTransfer.setData("text/plain",
      (event.clientX) + ',' + event.clientY);
      ////////////////////////////////////////////console.log("Here is the left for dragging " + event.clientX);
  }
  function offset(el) 
  {
      var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }
  function drag_start(event) 
  {
      DraggedID = event.target.id;
      console.log("event.target.id " + event.target.id);
      AddElementToPage = false;
      var e = event || window.event;
      AddedLeft = e.pageX;
      AddedTop = e.pageY;
      var style = window.getComputedStyle(event.target, null);
      if (!style.getPropertyValue("left").toString().includes("auto") && !style.getPropertyValue("top").toString().includes("auto"))
      {
        event.dataTransfer.setData("text/plain",
        (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
      }
      else
      {
        if (WhichElement == "Button")
        {
          var rect = $("#" + EdittingButtonID).position();
          event.dataTransfer.setData("text/plain",
          (parseInt(rect.left,10) - event.clientX) + ',' + (parseInt(rect.top,10) - event.clientY));
        }
        else if (!ChosenIDForEditting.includes("drag") && !ChosenIDForEditting == "DraggingfromMenu")
        {
          var rect = $("#" + ChosenIDForEditting).position();
          event.dataTransfer.setData("text/plain",
          (parseInt(rect.left,10) - event.clientX + 320) + ',' + (parseInt(rect.top,10) - event.clientY - 20));
        }
        else if (WhichElement == "Video")
        {
          document.getElementById(EdittingVideoID).style.display = "none";
          var rect = $("#" + EdittingVideoID.substring(0, EdittingVideoID.length-2)).position();
          event.dataTransfer.setData("text/plain",
          (parseInt(rect.left,10) - event.clientX) + ',' + (parseInt(rect.top,10) - event.clientY));
        } 
        else if (WhichElement == "Div")
        {
          var rect = $("#" + EdittingDivID).position();
          if (rect)
          {
              DivDragBool = true;
              event.dataTransfer.setData("text/plain",(parseInt(rect.left,10) - event.clientX) + ',' + (parseInt(rect.top,10) - event.clientY));
          }
          else
          {
              DivDragBool = false;
          }
        }
        else if (WhichElement == "Text")
        {
          var rect = $("#" + ChosenIDForEditting).position();
          event.dataTransfer.setData("text/plain",
          (parseInt(rect.left,10) - event.clientX + 320) + ',' + (parseInt(rect.top,10) - event.clientY - 20));
        }
      }
  }
  function drag_over(event) 
  { 
      var e = event || window.event;
      AddedLeft = e.pageX;
      AddedTop = e.pageY;
      ////////////console.log("pageX " + AddedLeft);
      //////////////////////////////////console.log("pageY " + AddedTop);
      event.preventDefault(); 
      return false; 
  } 
  function drop(event) 
  { 
    ////////console.log("drop " + DraggedID);
    if (ChosenIDForEditting.includes("drag") || ChosenIDForEditting == "DraggingfromMenu")
    {
        if (!AddElementToPage)
        {
          AddElementToPage = true;
          if (!DraggedID.includes("createvideo"))
          {
              var nodeCopy = document.getElementById(DraggedID).cloneNode(true);
              var ID = Math.random().toString();
              nodeCopy.id = "newId" + ID.substring(2, ID.length);
              nodeCopy.draggable = false; 
              nodeCopy.contenteditable = true;
              var offset = event.dataTransfer.getData("text/plain").split(',');
              nodeCopy.style.position = 'absolute';
              nodeCopy.style.zIndex = '90';
              nodeCopy.style.left = (AddedLeft - 50) + 'px';
              nodeCopy.style.top = (AddedTop - 50) + 'px';
              if(DraggedID.includes("dragwork"))
              {
                nodeCopy.style.height = "150px";
                nodeCopy.style.width = "150px";
              }
              document.getElementById('WholeWebsite').appendChild(nodeCopy);
              SetButtons();
          }
          else
          {
              if (DraggedID == "createvideo1")
              {
                  CreateYoutubeBox();
              }
              else if (DraggedID == "createvideo2")
              {
                  CreateVimeoBox();
              }
              else if (DraggedID == "createvideo3")
              {
                  CreateDailymotionBox();
              }
              else if (DraggedID == "createvideo4")
              {
                  CreateFacebookBox();
              }
          }
          ////////////////////////////////console.log("nodeName " + nodeCopy.nodeName);
        }
    }
    else
    {
        console.log("Here it is");
        var offset = event.dataTransfer.getData("text/plain").split(',');
        var dm = document.getElementById(ChosenIDForEditting);
        if (WhichElement == "Video")
        {
          document.getElementById(EdittingVideoID).style.display = "block";
          dm = document.getElementById(EdittingVideoID).parentNode;
          //////////console.log("Here is the ID of the loop " + dm.id)
          dm.style.position = 'absolute';
          dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
          dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
          document.getElementById('WholeWebsite').appendChild(dm);
        }
        else if (WhichElement == "Div")
        {
          SaveStyleBeforeChanges(EdittingDivID);
          dm = document.getElementById(EdittingDivID);
          dm.style.position = 'absolute';
          if (!DivDragBool)
          {
              dm.style.left = (event.clientX + AddedLeft) + 'px';
              dm.style.top = (event.clientY + AddedTop) + 'px';
          }
          else
          {
              dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
              dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
          }
        }
        else
        {
          SaveStyleBeforeChanges(ChosenIDForEditting);
          dm.style.position = 'absolute';
          dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
          dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
        }
    }
      event.preventDefault();
      return false;
  } 
  var ChosenIDForEditting = "";
  var AddedLeft = 0;
  var AddedTop = 0;
  var WhichElement = "";
  var DivDragBool = false;
  var WhichMenuShouldAppear = 0;
  function SetButtons()
  {
      $('a').click(function (event) 
      {
          var PermissionBool = true;
          var text = $(event.target).text();
          var element = $(event.target).position();
          if (event.target.id.toString() == null || event.target.id.toString() == "")
          {
            event.target.id = "ChosenItemForEditting" + event.clientX + event.clientY;
          }
          var a = document.getElementById(event.target.id.toString());
          var els = [];
          while (a) 
          {
              els.unshift(a);
              a = a.parentNode;
              if (a)
              {
                if (a.id == "sidemenu")
                {
                   PermissionBool = false;
                }
              }
          }
          if (WhichMenuShouldAppear == 1)
          {
            WhichMenuShouldAppear = 2;
            PermissionBool = false;
          }
          ////////console.log("Here is the PermissionBool " + PermissionBool);
          if (PermissionBool)
          {
            ChosenIDForEditting = event.target.id;
            EdittingButtonID = event.target.id;
            WhichElement = "Button";
            HideAllBoxes();
            document.getElementById('EditButtonAndMenu').style.display = "block";
            document.getElementById('EditButtonAndMenu').style.left = (event.clientX-100) + "px";
            document.getElementById('EditButtonAndMenu').style.top = (event.clientY+40) + "px";
          }
      });
  }
  $(document).on('click touchstart', function (event)
  {
      //console.log(event.type);
      var PermissionBool = true;
      var VideoBool = false;
      var text = $(event.target).text();
      var element = $(event.target).position();
      if (event.target.id.toString() == null || event.target.id.toString() == "")
      {
        event.target.id = "ChosenItemForEditting" + event.clientX + event.clientY;
      }
      var a = document.getElementById(event.target.id.toString());
      var els = [];
      while (a) 
      {
          els.unshift(a);
          a = a.parentNode;
          if (a)
          {
            if (a.id == "sidemenu")
            {
               PermissionBool = false;
            }
          }
      }
      //console.log("It is setting the ID here " + event.target.nodeName);
      if (event.target.id.toString().includes("Youtube") || event.target.id.toString().includes("Dailymotion")
         || event.target.id.toString().includes("Vimeo") || event.target.id.toString().includes("Facebook"))
      {
          VideoBool = true;
      }
      if (WhichMenuShouldAppear == 1)
      {
        WhichMenuShouldAppear = 2;
        PermissionBool = false;
      }
      if (event.target.nodeName.toString().includes("SECTION"))
      {
          if (document.getElementById('ResizeImageForSection') == null)
          {
              console.log("It is creating buttons");
              var image = document.createElement('img');
              image.src = '../../images/SideBar/Resize.png';
              image.style.cssText = "pointer-events: none; position: absolute; width: 30px;height: 30px; z-index: 100;";
              image.style.top = ($('#' + event.target.id).offset().top + $('#' + event.target.id).outerHeight() - 20) + "px";
              image.style.left = (($('#' + event.target.id).width()/2)) + "px";
              image.id = "ResizeImageForSection";
              var image2 = document.createElement('img');
              image2.src = '../../images/SideBar/Resize.png';
              image2.style.cssText = "pointer-events: none; position: absolute; width: 30px;height: 30px; z-index: 100;";
              image2.style.top = ($('#' + event.target.id).offset().top - 10) + "px";
              image2.style.left = ($('#' + event.target.id).width()/2) + "px";
              image2.id = "ResizeImageForSection2";
              document.getElementById('Saved').appendChild(image);
              document.getElementById('Saved').appendChild(image2);
              $("#" + EdittingDivID).resizable({ disabled: false });
              $("#" + event.target.id).resizable({
                  stop: function(event, ui) {
                  },
                  resize : function(event,ui) 
                  {
                      var w = ui.size.width;
                      var h = ui.size.height;
                      var image = document.getElementById('ResizeImageForSection');
                      image.style.top = ($('#' + event.target.id).offset().top + $('#' + event.target.id).outerHeight() - 20) + "px";
                      image.style.left = (($('#' + event.target.id).width()/2)) + "px";
                      image = document.getElementById('ResizeImageForSection2');
                      image.style.top = ($('#' + event.target.id).offset().top - 10) + "px";
                      image.style.left = ($('#' + event.target.id).width()/2) + "px";
                  }
              });
          }
          else if (event.target.id.toString() != EdittingDivID)
          {
              console.log("It is editing buttons");
              var image = document.getElementById('ResizeImageForSection');
              image.style.top = ($('#' + event.target.id).offset().top + $('#' + event.target.id).outerHeight() - 20) + "px";
              image.style.left = (($('#' + event.target.id).width()/2)) + "px";
              image = document.getElementById('ResizeImageForSection2');
              image.style.top = ($('#' + event.target.id).offset().top - 10) + "px";
              image.style.left = ($('#' + event.target.id).width()/2) + "px";
          }
      }
      else
      {
          if (document.getElementById('ResizeImageForSection') != null)
          {
              document.getElementById('ResizeImageForSection').parentNode.removeChild(document.getElementById('ResizeImageForSection'));
              document.getElementById('ResizeImageForSection2').parentNode.removeChild(document.getElementById('ResizeImageForSection2'));
          }
      }
      if ((event.target.nodeName.toString().includes("H") || event.target.nodeName.toString().includes("P") || event.target.nodeName.toString().includes("LI") || event.target.nodeName.toString().includes("STRONG")) && PermissionBool && !VideoBool)
      {
            ChosenIDForEditting = event.target.id;
            EdittingTextID = event.target.id;
            WhichElement = "Text";
            HideAllBoxes();
            document.getElementById('EditTextButtonAndMenu').style.display = "block";
            document.getElementById('EditTextButtonAndMenu').style.left = (event.clientX-100) + "px";
            document.getElementById('EditTextButtonAndMenu').style.top = (event.clientY+40) + "px";
      }
      else if (event.target.nodeName.toString().includes("IMG") && PermissionBool && !VideoBool)
      {
            ChosenIDForEditting = event.target.id;
            EdittingImageID = event.target.id;
            WhichElement = "Image";
            SetImageMenu();
            ////////////////////////////////////////console.log("Here is the Image source " + document.getElementById(EdittingImageID).src);
            document.getElementById('edittedimage').src = document.getElementById(EdittingImageID).src;
            HideAllBoxes();
            document.getElementById('EditImageButtonAndMenu').style.display = "block";
            document.getElementById('EditImageButtonAndMenu').style.left = (event.clientX-200) + "px";
            document.getElementById('EditImageButtonAndMenu').style.top = (event.clientY+40) + "px";
      }
      else if (PermissionBool && VideoBool)
      {
            ChosenIDForEditting = event.target.id;
            EdittingVideoID = event.target.id + "2";
            WhichElement = "Video";
            SetVideoMenu();
            HideAllBoxes();
            document.getElementById('EditImageButtonAndMenu').style.display = "block";
            document.getElementById('EditImageButtonAndMenu').style.left = (event.clientX-200) + "px";
            document.getElementById('EditImageButtonAndMenu').style.top = (event.clientY+40) + "px";
      }
      else if ((event.target.nodeName.toString().includes("DIV") || event.target.nodeName.toString().includes("SECTION")) && PermissionBool)
      {
          ChosenIDForEditting = event.target.id;
          EdittingDivID = event.target.id;
          WhichElement = "Div";
          HideAllBoxes();
          document.getElementById('EditDivButtonAndMenu').style.display = "block";
          document.getElementById('EditDivButtonAndMenu').style.left = (event.clientX-100) + "px";
          document.getElementById('EditDivButtonAndMenu').style.top = (event.clientY+40) + "px";
      }
      else if (event.target.id.toString() == "reorderdivbuttonforwebpage")
      {
          document.getElementById('EditDivButtonAndMenu').style.display = "none";
          document.getElementById('EditReOrderButtonAndMenu').style.display = "block";
          document.getElementById('EditReOrderButtonAndMenu').style.left = document.getElementById('EditDivButtonAndMenu').style.left;
          document.getElementById('EditReOrderButtonAndMenu').style.top = document.getElementById('EditDivButtonAndMenu').style.top;
      }
      else
      {
            document.getElementById('EditTextButtonAndMenu').style.display = "none";
            document.getElementById('EditImageButtonAndMenu').style.display = "none";
            document.getElementById('EditDivButtonAndMenu').style.display = "none";
            document.getElementById('EditReOrderButtonAndMenu').style.display = "none";

      }
  });
  window.onscroll = function (e) 
  {  
          document.getElementById('EditTextButtonAndMenu').style.display = "none"; 
          document.getElementById('EditReOrderButtonAndMenu').style.display = "none";
          document.getElementById('EditDivButtonAndMenu').style.display = "none"; 
          document.getElementById('EditImageButtonAndMenu').style.display = "none";
          document.getElementById('EditTextButtonAndMenuForRightClick').style.display = "none";
          document.getElementById('EditImageButtonAndMenuForRightClick').style.display = 'none';
          document.getElementById('EditButtonAndMenu').style.display = "none";
  } 
  function SetVideoMenu()
  {
    document.getElementById('changingimagebuttonforwebpage').onclick = function(){ ResizeVideo(this); };
    document.getElementById('settingsimagebuttonforwebpage').onclick = function(){ ChangeVideoButtonPressed(); };
    document.getElementById('draggingimagebuttonforwebpage').onclick = function(){ DragandDropVideo(); };
    document.getElementById('deletingimagebuttonforwebpage').onclick = function(){ DeleteVideo(this); };

    document.getElementById('changingimagebuttonforwebpage').innerHTML = "Resize Video";
    document.getElementById('settingsimagebuttonforwebpage').innerHTML = "Change Video";
    document.getElementById('draggingimagebuttonforwebpage').innerHTML = "Drag & Drop";
    document.getElementById('deletingimagebuttonforwebpage').innerHTML = "Delete Item";
  }
  function SetImageMenu()
  {
    document.getElementById('changingimagebuttonforwebpage').onclick = function(){ ResizeImage(this); };
    document.getElementById('settingsimagebuttonforwebpage').onclick = function(){ ChangeImageButtonPressed(); };
    document.getElementById('draggingimagebuttonforwebpage').onclick = function(){ DragandDrop(); };
    document.getElementById('deletingimagebuttonforwebpage').onclick = function(){ DeleteItem(this); };

    document.getElementById('changingimagebuttonforwebpage').innerHTML = "Resize Image";
    document.getElementById('settingsimagebuttonforwebpage').innerHTML = "Change Image";
    document.getElementById('draggingimagebuttonforwebpage').innerHTML = "Drag & Drop";
    document.getElementById('deletingimagebuttonforwebpage').innerHTML = "Delete Item";
  }
  function ReOrder()
  {
      //console.log("Here is the style " + document.getElementById('EditDivButtonAndMenu').style.left);
  }
  function DragandDrop()
  {
    if (ChosenIDForEditting != null && ChosenIDForEditting != "" && ChosenIDForEditting != "DraggingfromMenu")
    {
      var dm = document.getElementById(ChosenIDForEditting); 
      dm.contenteditable = false;
      dm.draggable = true;
      dm.addEventListener('dragstart',drag_start,false); 
      if (WhichElement == "Image")
      {
        if (EdittingImageID != "")
        {
            $("#" + EdittingImageID).resizable({ disabled: true });
            $("#" + EdittingImageID).resizable('destroy');
        }
      }
      else if (WhichElement == "Button")
      {
        if (EdittingButtonID != "")
        {
            $("#" + EdittingButtonID).resizable({ disabled: true });
            $("#" + EdittingButtonID).resizable('destroy');
        }
      }
      DeleteResizeButtons();
      /*//document.getElementById(ChosenIDForEditting).ondragstart = drag(event);
      document.getElementById(ChosenIDForEditting).addEventListener('dragstart', function() {drag(event)}, false);
      document.getElementById(ChosenIDForEditting).contenteditable = false;*/
    }
  }
  function DragandDropVideo()
  {
    if (ChosenIDForEditting != null && ChosenIDForEditting != "" && ChosenIDForEditting != "DraggingfromMenu")
    {
      document.getElementById(EdittingVideoID).style.display = "block"; 
      var dm = document.getElementById(EdittingVideoID).parentNode; 
      dm.draggable = true;
      dm.setAttribute('draggable', 'true');
      dm.addEventListener('dragstart',drag_start,false); 
      if (EdittingVideoID != "")
      {
          $("#" + dm.id).resizable({ disabled: true });
          $("#" + dm.id).resizable('destroy');
      }
      DeleteResizeButtons();
    }
  }
  function ShowPageSettings() 
  {
    document.getElementById('sidemenuforpagemenu').style.display = "block";
    document.getElementById('sidemenuforpagemenuSettings').style.display = "block";
  }
  function EditTextInMode()
  {
    var TextBox = document.getElementById('EditTextBoxMenu'); 
    TextBox.draggable = true;
    TextBox.addEventListener('dragstart',drag_start,false); 
    var dm = document.getElementById(ChosenIDForEditting); 
    dm.contenteditable = true;
    dm.draggable = false;
  }
  function EditText()
  {
    HideAllBoxes();
    document.getElementById('EditTextBoxMenu').style.display = "block";
    var TextBox = document.getElementById('EditTextBoxMenu'); 
    TextBox.draggable = true;
    TextBox.addEventListener('dragstart',drag_start,false); 
    var dm = document.getElementById(ChosenIDForEditting); 
    dm.contenteditable = true;
    dm.draggable = false;
    ChosenIDForEditting = "EditTextBoxMenu";
  }
  function HideAllBoxes()
  {
    document.getElementById('EditTextButtonAndMenu').style.display = "none"; 
    document.getElementById('EditDivButtonAndMenu').style.display = "none"; 
    document.getElementById('EditReOrderButtonAndMenu').style.display = "none";
    document.getElementById('EditImageButtonAndMenu').style.display = "none";
    document.getElementById('EditTextButtonAndMenuForRightClick').style.display = "none";
    document.getElementById('EditImageButtonAndMenuForRightClick').style.display = 'none';
    document.getElementById('EditButtonAndMenu').style.display = "none";
    document.getElementById('sidemenubox').style.display = "none";
    document.getElementById('sidemenuforuploads').style.display = "none";
    document.getElementById('UploadedImagesAndVideos').style.display = "none";
    document.getElementById('EditTextBoxMenu').style.display = "none";
    document.getElementById('EditImageBoxMenu').style.display = "none";
    document.getElementById('sidemenuforpagemenu').style.display = "none";
    document.getElementById('EditVideoBoxMenu').style.display = "none";
    document.getElementById('EditButtonBoxMenu').style.display = "none";
    document.getElementById('sidemenuforpagemenuSettings').style.display = "none";
    document.getElementById('EditTextButtonAndMenuForRightClick').style.display = "none";
    document.getElementById('EditImageButtonAndMenuForRightClick').style.display = "none";
  }
  function ChangeImageButtonPressed()
  {
    HideAllBoxes();
    document.getElementById('EditImageBoxMenu').style.display = "block";
    var ImageBox = document.getElementById('EditImageBoxMenu'); 
    ImageBox.draggable = true;
    ImageBox.addEventListener('dragstart',drag_start,false); 
    ChosenIDForEditting = "EditImageBoxMenu";
  }
  function ChangeButtonPressed()
  {
    HideAllBoxes();
    document.getElementById('EditButtonBoxMenu').style.display = "block";
    var ImageBox = document.getElementById('EditButtonBoxMenu'); 
    ImageBox.draggable = true;
    ImageBox.addEventListener('dragstart',drag_start,false); 
    ChosenIDForEditting = "EditButtonBoxMenu";
    LinkIsPressedFortext(true);
    document.getElementById('edittextbutton').value = document.getElementById(EdittingButtonID).innerHTML;
    //////console.log("Here is the value " + document.getElementById(EdittingButtonID).innerHTML);
    $("#edittextbutton").on("input", function() 
    {
      document.getElementById(EdittingButtonID).innerHTML = $(this).val();
    });
  }
  document.body.addEventListener('dragover',drag_over,false); 
  document.body.addEventListener('drop',drop,false);
  function reloadAllSelects()
  {
    window.asd = $('.SlectBox').SumoSelect({ csvDispCount: 3, captionFormatAllSelected: "All Selected" });
    window.test = $('.testsel').SumoSelect({okCancelInMulti:true, captionFormatAllSelected: "All Selected" });
    window.testSelAll = $('.testSelAll').SumoSelect({okCancelInMulti:true, selectAll:true });
    window.testSelAlld = $('.SlectBox-grp').SumoSelect({okCancelInMulti:true, selectAll:true });
    window.testSelAll2 = $('.testSelAll2').SumoSelect({selectAll:true });
    window.Search = $('.search-box').SumoSelect({ csvDispCount: 3, search: true, searchText:'Enter here.' });
    window.searchSelAll = $('.search-box-sel-all').SumoSelect({ csvDispCount: 3, selectAll:true, search: true, searchText:'Enter here.', okCancelInMulti:true });
    window.searchSelAll = $('.search-box-open-up').SumoSelect({ csvDispCount: 3, selectAll:true, search: true, searchText:'Enter here.', up:true });
    window.groups_eg_g = $('.groups_eg_g').SumoSelect({selectAll:true, search:true });
    $('.search_test').SumoSelect({search: true, searchText: 'Search...'});
  }
  function str2DOMElement(html) 
  {
    var frame = document.createElement('iframe');
    frame.style.display = 'none';
    document.body.appendChild(frame);             
    frame.contentDocument.open();
    frame.contentDocument.write(html);
    frame.contentDocument.close();
    var el = frame.contentDocument.body.firstChild;
    document.body.removeChild(frame);
    return el;
}
  var AllStoredActions = [];
  var StoredIndex = -1;
  var LastStoredIndex = -1;
  function UndoActions()
  {
      if (StoredIndex == -1)
      {
        StoredIndex = AllStoredActions.length-1;
      }
      else if (StoredIndex != 0)
      {
        StoredIndex -= 1;
      }
      if (AllStoredActions.length > 0 && AllStoredActions.length > StoredIndex)
      {
          var arr = AllStoredActions[StoredIndex].split("δ");
          if (arr.length == 3)
          {
            if (arr[1] == "style")
            {
                if (StoredIndex == AllStoredActions.length-1 && LastStoredIndex == StoredIndex)
                {
                  SaveStyleBeforeChanges(arr[0]);
                }
                document.getElementById(arr[0]).style.cssText = arr[2]
            }
            else if (arr[1] == "src")
            {
                if (StoredIndex == AllStoredActions.length-1 && LastStoredIndex == StoredIndex)
                {
                  SaveImageSrcBeforeChanges(arr[0]);
                }
                document.getElementById(arr[0]).src = arr[2]
            }
            else if (arr[1] == "remove")
            {
                var el = str2DOMElement(arr[2]);
                document.getElementById(arr[0]).appendChild(el);
                if (StoredIndex == AllStoredActions.length-1 && LastStoredIndex == StoredIndex && el != null)
                {
                  //Save(arr[0]);
                  //SaveAddedItemBeforeChanges(arr[0], el.id);
                }
            }
            else if (arr[1] == "addsection")
            {
                var el = str2DOMElement(arr[2]);
                if (StoredIndex == AllStoredActions.length-1 && LastStoredIndex == StoredIndex)
                {
                  //SaveRemovedItemBeforeChanges(arr[0], el.outerHTML);
                  //Save(arr[0]);
                }
                document.getElementById(arr[0]).removeChild(document.getElementById(el.id));
            }
          }
      }
      LastStoredIndex = StoredIndex;
  }
  function RedoActions()
  {
      if (StoredIndex == -1)
      {
        StoredIndex = AllStoredActions.length-1;
      }
      else if (StoredIndex != AllStoredActions.length-1)
      {
        StoredIndex += 1;
      }
      //////////////console.log("Here is the redo index " + StoredIndex);
      if (AllStoredActions.length > 0 && AllStoredActions.length > StoredIndex)
      {
          ////////////////console.log("Here is the AllStoredActions[StoredIndex] " + AllStoredActions[StoredIndex]);
          var arr = AllStoredActions[StoredIndex].split("δ");
          if (arr.length == 3)
          {
            if (arr[1] == "style")
            {
                document.getElementById(arr[0]).style.cssText = arr[2]
            }
            else if (arr[1] == "src")
            {
                document.getElementById(arr[0]).src = arr[2]
            }
            else if (arr[1] == "addsection")
            {
                var el = str2DOMElement(arr[2]);
                //document.getElementById(arr[0]).removeChild(element);
                document.getElementById(arr[0]).appendChild(el);
            }
            else if (arr[1] == "remove")
            {
                var el = str2DOMElement(arr[2]);
                document.getElementById(arr[0]).removeChild(el);
            }
          }
      }
  }
  function SaveStyleBeforeChanges(ID)
  {
    StoredIndex = -1;
    if (AllStoredActions.length > 0)
    {
      ////////////////console.log(document.getElementById(ID).nodeName);
      if (AllStoredActions[AllStoredActions.length-1] != ID+"δstyleδ"+document.getElementById(ID).style.cssText)
      {
          AllStoredActions.push(ID+"δstyleδ"+document.getElementById(ID).style.cssText);
      }
    }
    else
    {
      AllStoredActions.push(ID+"δstyleδ"+document.getElementById(ID).style.cssText);
    }
  }
  function SaveImageSrcBeforeChanges(ID)
  {
    StoredIndex = -1;
    if (AllStoredActions.length > 0)
    {
      if (AllStoredActions[AllStoredActions.length-1] != ID + "δsrcδ"+document.getElementById(ID).src)
      {
          AllStoredActions.push(ID+"δsrcδ"+document.getElementById(ID).src);
      }
    }
    else
    {
      AllStoredActions.push(ID+"δsrcδ"+document.getElementById(ID).src);
    }
  }
  function SaveAddedItemBeforeChanges(ParentID, ID)
  {
    StoredIndex = -1;
    if (AllStoredActions.length > 0)
    {
      if (AllStoredActions[AllStoredActions.length-1] != ParentID+"δaddsectionδ"+ID)
      {
          AllStoredActions.push(ParentID+"δaddsectionδ"+ID);
      }
    }
    else
    {
      AllStoredActions.push(ParentID+"δaddsectionδ"+ID);
    }
  }
  function SaveRemovedItemBeforeChanges(ParentID, ID)
  {
    StoredIndex = -1;
    if (AllStoredActions.length > 0)
    {
      if (AllStoredActions[AllStoredActions.length-1] != ParentID+"δremoveδ"+document.getElementById(ID).outerHTML)
      {
          AllStoredActions.push(ParentID+"δremoveδ"+document.getElementById(ID).outerHTML);
      }
    }
    else
    {
      AllStoredActions.push(ParentID+"δremoveδ"+document.getElementById(ID).outerHTML);
    }
  }
  function AllQueriesFunction()
  {
        $('#alignmentdropdown').click(function(k,sel) 
         {
          //////////////////////////////////////////console.log("Here is the value " + $(this).val());
          SaveStyleBeforeChanges(EdittingTextID);
          if ($(this).val() == "Center")
          {
            document.getElementById(EdittingTextID).style.textAlign = "center";
          }
          else if ($(this).val() == "Left")
          {
            document.getElementById(EdittingTextID).style.textAlign = "left";
          }
          else if ($(this).val() == "Right")
          {
            document.getElementById(EdittingTextID).style.textAlign = "right";
          }
         });

        $("#fontsizedittextbutton").on("input", function() 
        {
          SaveStyleBeforeChanges(EdittingTextID);
          document.getElementById(EdittingTextID).style.fontSize = $(this).val() + "px";
        });
        $('#boldedittextbutton').click(function(k,sel) 
         {
          SaveStyleBeforeChanges(EdittingTextID);
          if (document.getElementById('boldedittextbutton').style.backgroundColor == "" || document.getElementById('boldedittextbutton').style.backgroundColor == null || document.getElementById('boldedittextbutton').style.backgroundColor.toString().includes("255"))
          {
            document.getElementById('boldedittextbutton').style.backgroundColor = "#2D4150";
            document.getElementById('boldedittextbutton').style.color = "#ffffff";
            document.getElementById(EdittingTextID).style.fontWeight = "bold";
          }
          else
          {
            document.getElementById('boldedittextbutton').style.backgroundColor = "#ffffff";
            document.getElementById('boldedittextbutton').style.color = "#2D4150";
            document.getElementById(EdittingTextID).style.fontWeight = "normal";
          }
         });
        $('#italicedittextbutton').click(function(k,sel) 
         {
          ////////////////////////////////////console.log("Here is the value2 " + EdittingTextID);
          SaveStyleBeforeChanges(EdittingTextID);
          if (document.getElementById('italicedittextbutton').style.backgroundColor == "" || document.getElementById('italicedittextbutton').style.backgroundColor == null || document.getElementById('italicedittextbutton').style.backgroundColor.toString().includes("255"))
          {
            document.getElementById('italicedittextbutton').style.backgroundColor = "#2D4150";
            document.getElementById('italicedittextbutton').style.color = "#ffffff";
            document.getElementById(EdittingTextID).style.fontStyle = "italic";
          }
          else
          {
            document.getElementById('italicedittextbutton').style.backgroundColor = "#ffffff";
            document.getElementById('italicedittextbutton').style.color = "#2D4150";
            document.getElementById(EdittingTextID).style.fontStyle = "";
          }
         });
        $('#underlinedittextbutton').click(function(k,sel) 
         {
          ////////////////////////////////////////console.log("Here is the value3 " + EdittingTextID);
          SaveStyleBeforeChanges(EdittingTextID);
          if (document.getElementById('underlinedittextbutton').style.backgroundColor == "" || document.getElementById('underlinedittextbutton').style.backgroundColor == null || document.getElementById('underlinedittextbutton').style.backgroundColor.toString().includes("255"))
          {
            document.getElementById('underlinedittextbutton').style.backgroundColor = "#2D4150";
            document.getElementById('underlinedittextbutton').style.color = "#ffffff";
            document.getElementById(EdittingTextID).style.textDecoration = "underline";
          }
          else
          {
            document.getElementById('underlinedittextbutton').style.backgroundColor = "#ffffff";
            document.getElementById('underlinedittextbutton').style.color = "#2D4150";
            document.getElementById(EdittingTextID).style.textDecoration = "";
          }
         });  
        $('#fontsdropdown').click(function(k,sel) 
         {
          SaveStyleBeforeChanges(EdittingTextID);
          //////////////////////////////////console.log("Here is the value " + $(this).val());
          if ($(this).val() == "Open Sans")
          {
            document.getElementById(EdittingTextID).style.fontFamily = "sans-serif";
          }
          else if ($(this).val() == "Arial")
          {
            document.getElementById(EdittingTextID).style.fontFamily = "arial";
          }
          else if ($(this).val() == "Times New Roman")
          {
            document.getElementById(EdittingTextID).style.fontFamily = "Times New Roman";
          }
          else if ($(this).val() == "Times")
          {
            document.getElementById(EdittingTextID).style.fontFamily = "times";
          }
          else if ($(this).val() == "Cambria")
          {
            document.getElementById(EdittingTextID).style.fontFamily = "Cambria";
          }
          else if ($(this).val() == "Calibri")
          {
            document.getElementById(EdittingTextID).style.fontFamily = "Calibri";
          }
          else if ($(this).val() == "Avenir")
          {
            document.getElementById(EdittingTextID).style.fontFamily = "Avenir";
          }
          else if ($(this).val() == "Century")
          {
            document.getElementById(EdittingTextID).style.fontFamily = "Century";
          }
          else if ($(this).val() == "Futura")
          {
            document.getElementById(EdittingTextID).style.fontFamily = "Futura";
          }
          else if ($(this).val() == "Raleway")
          {
            document.getElementById(EdittingTextID).style.fontFamily = "Raleway";
          }
          else if ($(this).val() == "Lucida")
          {
            document.getElementById(EdittingTextID).style.fontFamily = "Lucida";
          }
          else if ($(this).val() == "Impact")
          {
            document.getElementById(EdittingTextID).style.fontFamily = "Impact";
          }
          else if ($(this).val() == "Charcoal")
          {
            document.getElementById(EdittingTextID).style.fontFamily = "Charcoal";
          }
         });
        $('#themesdropdown').click(function(k,sel) 
         {
            var e = document.getElementById(EdittingTextID);
            //////////////console.log("Here is the id " + e.parentNode.id);
            //////////////console.log("Here is the left " + e.style.left);
            //////////////console.log("Here is the outer html1 " + e.outerHTML);
          SaveStyleBeforeChanges(EdittingTextID);
          if ($(this).val() == "Site Title")
          {
            var e = document.getElementById(EdittingTextID);
            var elementvalue = e.innerHTML || e.value;
            var d = document.createElement('h1');
            d.innerHTML = elementvalue;
            d.id = EdittingTextID;
            d.style.cssText = e.style.cssText;
            //////////////////////////////console.log("Here is the outer style " + e.style.top);
            e.parentNode.replaceChild(d, e);
          }
          else if ($(this).val() == "Page Title")
          {
            var e = document.getElementById(EdittingTextID);
            var elementvalue = e.innerHTML || e.value;
            var d = document.createElement('h2');
            d.innerHTML = elementvalue;
            d.style.cssText = e.style.cssText;
            d.id = EdittingTextID;
            e.parentNode.replaceChild(d, e);
          }
          else if ($(this).val() == "Huge Heading")
          {
            var e = document.getElementById(EdittingTextID);
            var elementvalue = e.innerHTML || e.value;
            var d = document.createElement('h3');
            d.innerHTML = elementvalue;
            d.style.cssText = e.style.cssText;
            d.id = EdittingTextID;
            e.parentNode.replaceChild(d, e);
          }
          else if ($(this).val() == "Large Heading")
          {
            var e = document.getElementById(EdittingTextID);
            var elementvalue = e.innerHTML || e.value;
            var d = document.createElement('h4');
            d.innerHTML = elementvalue;
            d.style.cssText = e.style.cssText;
            d.id = EdittingTextID;
            e.parentNode.replaceChild(d, e);
          }
          else if ($(this).val() == "Normal Heading")
          {
            var e = document.getElementById(EdittingTextID);
            var elementvalue = e.innerHTML || e.value;
            var d = document.createElement('h5');
            d.innerHTML = elementvalue;
            d.style.cssText = e.style.cssText;
            d.id = EdittingTextID;
            e.parentNode.replaceChild(d, e);
          }
          else if ($(this).val() == "Small Heading")
          {
            var e = document.getElementById(EdittingTextID);
            var elementvalue = e.innerHTML || e.value;
            var d = document.createElement('h6');
            d.innerHTML = elementvalue;
            d.style.cssText = e.style.cssText;
            d.id = EdittingTextID;
            e.parentNode.replaceChild(d, e);
          }
          else if ($(this).val() == "Paragraph 1")
          {
            var e = document.getElementById(EdittingTextID);
            var elementvalue = e.innerHTML || e.value;
            var d = document.createElement('p');
            d.innerHTML = elementvalue;
            d.style.cssText = e.style.cssText;
            d.id = EdittingTextID;
            e.parentNode.replaceChild(d, e);
          }
          else if ($(this).val() == "Paragraph 2")
          {
            //document.getElementById(EdittingTextID).style.textAlign = "right";
          }
          else if ($(this).val() == "Paragraph 3")
          {
            //document.getElementById(EdittingTextID).style.textAlign = "right";
          }
         });
        $("#colorpickeredittextbutton").spectrum({
            color: "#ECC",
            showInput: true,
            className: "full-spectrum",
            showInitial: true,
            showPalette: true,
            showSelectionPalette: true,
            maxSelectionSize: 10,
            preferredFormat: "hex",
            localStorageKey: "spectrum.demo",
            move: function (color) {
                ////////////////////////////////////////console.log("move is pressed ");
                
            },
            show: function () {
                ////////////////////////////////////////console.log("show is pressed");
            
            },
            beforeShow: function () {
                ////////////////////////////////////////console.log("beforeshow is pressed");
            
            },
            hide: function (color) {
                ////////////////////////////////////////console.log("hide is pressed1 " + color);
             SaveStyleBeforeChanges(EdittingTextID);
            document.getElementById(EdittingTextID).style.color = color;
            
            },
            change: function() {
                ////////////////////////////////////////console.log("Change is pressed");
            },
            palette: [
                ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
                "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
                ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
                "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"], 
                ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", 
                "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)", 
                "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", 
                "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)", 
                "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", 
                "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", 
                "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
            ]
        });
        $('#linkdropdowntype').click(function(k,sel) 
         {
          ChangeContectAccordingToSelected('changecontentaccordingtoselectlink', $(this).val());
         });
  }
  var SelectedLink = "";
  var SelectedLinkValue = "";
  function LinkIsPressedFortext(check) 
  {
    var div = document.getElementById('boxcontainerforlinkmenu');
    if (check)
    {
      var div = document.getElementById('boxcontainerforlinkmenuForButton');
    }
    div.innerHTML = "";
        var p = document.createElement("p");
        p.style.paddingTop = "10px";
        p.innerHTML = "What do you want to link it to?";
        p.id = "WhichlinktoForText";
        div.appendChild(p);
        var select = document.createElement("select");
        select.className = "testsel";
        select.id = "linkdropdowntypeforText";
        select.style.width = "250px";
        select.style.height = "40px";
        select.style.marginLeft = "20px";
        select.onclick = 'ChangeDropDownAccordingToSelected()';
        var option = document.createElement("option");
        option.innerHTML = "Web Address";
        select.appendChild(option);
        var option = document.createElement("option");
        option.innerHTML = "Page";
        select.appendChild(option);
        div.appendChild(select);
        var InsideDiv = document.createElement("div");
        InsideDiv.innerHTML = "";
        InsideDiv.id = "changecontentaccordingtoselectlinkForText";
        var Insidep = document.createElement("p");
        Insidep.style.paddingTop = "10px";
        Insidep.innerHTML = "Link";
        Insidep.id = "LinkEditForText";
        InsideDiv.appendChild(Insidep);
        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = "https://www.google.com";
        input.id = "linktextbutton";
        input.style.marginLeft = "20px";
        input.style.width = "250px";
        input.style.height = "40px";
        input.style.paddingLeft = "20px";
        var LinkButton = document.createElement("input");
        LinkButton.type = "button";
        LinkButton.id = "changeLinkButtonInsideMenu";
        LinkButton.value = "Set Link";
        LinkButton.onclick = function(){ ChangeLink(this); };
        LinkButton.style.cssText = "margin-left: 70px; margin-top: 40px;height: 40px;color: white;background-color: #2D4150;font-family: 'Lato', sans-serif;font-size: 20px;font-weight: bold;width: 150px; border: 0;border-radius: 10px;";
        InsideDiv.appendChild(input);
        InsideDiv.appendChild(LinkButton);
        div.appendChild(InsideDiv);
        reloadAllSelects();
        SelectedLink = "Text";
        //////console.log("Link is pressed here");
        $('#EditTextBoxMenuContent').scrollTop($('#EditTextBoxMenuContent')[0].scrollHeight);
    $('#linkdropdowntypeforText').click(function(k,sel) 
     {
      ChangeContectAccordingToSelected('changecontentaccordingtoselectlinkForText', $(this).val());
     });
  }
  function ChangeLink()
  {
    var EdittingElement = EdittingButtonID;
    if (WhichElement == "Button")
    {
        var EdittingElement = EdittingButtonID;
    }
    else
    {
        var EdittingElement = EdittingTextID;
    }
    if (SelectedLink == "Text")
    {
        if (document.getElementById('linktextbutton').value != "")
        {
          ////console.log("Here is the ID " + EdittingButtonID);
          document.getElementById(EdittingElement).setAttribute("onclick", "SetLinkWithUrl('" + document.getElementById('linktextbutton').value + "');return false;");
          document.getElementById(EdittingElement).onclick = function(){ SetLinkWithUrl(document.getElementById('linktextbutton').value);return false; };
        }
    }
    else
    {
        if (SelectedLinkValue)
        {
          ////console.log("Here is the ID " + SelectedLinkValue);
          document.getElementById(EdittingElement).setAttribute("onclick", "GetPageAsLink('" + SelectedLinkValue + "');return false;");
        }
    }
  }
  function SetLinkWithUrl(link)
  {
      ////console.log("Here is the link " + link);
      if (Preview)
      {
        document.location.href = link;
      }
  }
  function GetPageAsLink(NameOfPage)
  {
        ////////////////////////console.log("Here is the get website2 " + NameOfPage);
      if (Preview)
      {
        $.ajax({
            url: '../../api/getWebsiteContent',
            type: 'GET',
            headers: {
                "Email" : sessionStorage.getItem('email'),
                "Page" : sessionStorage.getItem('EditingPage'),
                "WebName" : sessionStorage.getItem('PageName'),
                'token': sessionStorage.getItem('token')
            },
            cache: false,
            dataType: 'json',
            success: function(response) {
                var status = response['status'];
                //////////////////////////////console.log("Resposne " + JSON.stringify(response));
                if (status == 200)
                {
                    var result = JSON.parse(response['response']);
                    var pagenames = result['pagenames'];
                    var htmlPage = result['html'];
                    //////////////////////////////console.log("Here is the number of pages " + JSON.stringify(result));
                    var pageIndex = pagenames.indexOf(NameOfPage);
                    var html = "";
                    if (pageIndex > -1 && htmlPage.length > 0)
                    {
                      html = htmlPage[pageIndex];
                      var string = JSON.parse("[" + html + "]");
                      html = LZW.decompress(string);
                      if (html == null || html == "")
                      {
                          html = htmlPage[0];
                      }
                    }
                    else if (htmlPage.length > 0)
                    {
                          html = htmlPage[0];
                    }
                    if (htmlPage.length > 0 && sessionStorage.getItem('AddedNewTab') != "true")
                    { 
                          html = html.replaceAll("\\n", "\n");
                          html = html.replaceAll("\\t", "\t");
                          html = html.replaceAll("\\", "");
                          var index = html.indexOf("<");
                          if (index != 0)
                          {
                              html = html.substr(index, html.length-3);
                          }
                          var htmlIndex = html.indexOf("</footer>");
                          if (htmlIndex > -1)
                          {
                              html = html.substr(0, htmlIndex) + "</footer></div>";
                          }
                          ////////////////////console.log("Here is the html " + index);
                          document.getElementById("WholeWebsite").outerHTML = html;
                          if (Preview)
                          {
                              SetAllTextToNonEditable();
                          }
                          else
                          {
                            SetAllTextToEditable();
                          }
                    }
                }
            }
        });
      }
  }
  function ChangeContectAccordingToSelected(divId, value)
  {
    //////////////////////////////////////////console.log("Here is the value4 " + value);
    var div = document.getElementById(divId);
    div.innerHTML = "";
    var SavedID = "";
    if (value == "Page")
    {
            SelectedLink = "DropDown";
            var p = document.createElement("p");
            p.style.paddingTop = "10px";
            p.innerHTML = "Which Page?";
            div.appendChild(p);
            var select = document.createElement("select");
            select.className = "testsel";
            if (divId == "changecontentaccordingtoselectlinkForText")
            {
              select.id = "linkdropdowntopageForText";
              SavedID = "linkdropdowntopageForText";
            }
            else
            {
              select.id = "linkdropdowntopage";
              SavedID = "linkdropdowntopage";
            }
            select.style.width = "250px";
            select.style.height = "40px";
            select.style.marginLeft = "20px";
            var list  = document.getElementById("ListForContentOfPagesForSideMenu").getElementsByTagName("li");
            for (var i = 0; i < list.length; i++) 
            {
                var option = document.createElement("option");
                option.innerHTML = document.getElementById("ListForContentOfPagesForSideMenu").getElementsByTagName("li")[i].innerHTML;
                select.appendChild(option);
            }
            div.appendChild(select);
            var LinkButton = document.createElement("input");
            LinkButton.type = "button";
            LinkButton.id = "changeLinkButtonInsideMenu";
            LinkButton.value = "Set Link";
            LinkButton.onclick = function(){ ChangeLink(this); };
            LinkButton.style.cssText = "margin-left: 70px; margin-top: 40px;height: 40px;color: white;background-color: #2D4150;font-family: 'Lato', sans-serif;font-size: 20px;font-weight: bold;width: 150px; border: 0;border-radius: 10px;";
            div.appendChild(LinkButton);
            var p = document.createElement("p");
            p.innerHTML = "";
            select.style.width = "250px";
            select.style.height = "50px";
            div.appendChild(p);
            reloadAllSelects();
            $('#' + SavedID).click(function(k,sel) 
             {
                //////////////////////console.log("Here is it " + $(this).val());
                SelectedLinkValue = $(this).val();
             });
    }
    else
    {
            SelectedLink = "Text";
            var p = document.createElement("p");
            p.style.paddingTop = "10px";
            p.innerHTML = "Link";
            var input = document.createElement("input");
            input.type = "text";
            input.placeholder = "https://www.google.com";
            if (divId == "changecontentaccordingtoselectlinkForText")
            {
              p.id = "LinkEditForText";
              input.id = "linktextbutton";
            input.style.marginLeft = "20px";
            input.style.width = "250px";
            input.style.height = "40px";
            input.style.paddingLeft = "20px";
            }
            else
            {
              p.id = "LinkEditForImage";
              input.id = "linkimagetextbutton";
            }
            div.appendChild(p);
            div.appendChild(input);
            var LinkButton = document.createElement("input");
            LinkButton.type = "button";
            LinkButton.id = "changeLinkButtonInsideMenu";
            LinkButton.value = "Set Link";
            LinkButton.onclick = function(){ ChangeLink(this); };
            LinkButton.style.cssText = "margin-left: 70px; margin-top: 40px;height: 40px;color: white;background-color: #2D4150;font-family: 'Lato', sans-serif;font-size: 20px;font-weight: bold;width: 150px; border: 0;border-radius: 10px;";
            div.appendChild(LinkButton);

    }
  }
  String.prototype.replaceAll = function(str1, str2, ignore) 
  {
      return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
  } 
  function CreateFacebookVideo()
  {
    var FBdiv = document.createElement('div');
    FBdiv.id = "fb-root";
    FBdiv.style.cssText = "position: absolute;top: 50%;left: 50%;margin-top: -50px;margin-left: -50px;width: 500px;height: 300px; z-index: 90;";
    document.getElementById('WholeWebsite').appendChild(FBdiv);

    var div = document.createElement('div');
    var randomID = Math.random().toString();
    div.id = "Facebook" + randomID.substring(2, randomID.length);
    div.style.cssText = "position: absolute;top: 50%;left: 50%;margin-top: -50px;margin-left: -50px;width: 500px;height: 300px; z-index: 90;";
    div.innerHTML = "<div class='fb-video' data-href='https://www.facebook.com/facebook/videos/10153231379946729/' data-width='500' data-show-text='false'><div class='fb-xfbml-parse-ignore'>  <blockquote cite='https://www.facebook.com/facebook/videos/10153231379946729/'>    <a href='https://www.facebook.com/facebook/videos/10153231379946729/'>How to Share With Just Friends</a>    <p>How to share with just friends.</p>    Posted by <a href='https://www.facebook.com/facebook/'>Facebook</a> on Friday, December 5, 2014  </blockquote></div></div>";
    document.getElementById('WholeWebsite').appendChild(div);
    EdittingVideoID = div.id;

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
  }
  function CreateDailymotionVideo()
  {
      var div = document.createElement('div');
      var randomID = Math.random().toString();
      div.id = "Dailymotion" + randomID.substring(2, randomID.length);
      div.style.cssText = "position: absolute;top: 50%;left: 50%;margin-top: -50px;margin-left: -50px;width: 500px;height: 300px; z-index: 90;";
      document.getElementById('WholeWebsite').appendChild(div);
      EdittingVideoID = div.id;
      var player = DM.player(div, 
      {
          video: "xwr14q",
          width: "100%",
          height: "100%",
          params: {
              autoplay: true,
              mute: true
          }
      });
  }
  function CreateVimeoVideo()
  {
    var iframe = document.createElement('iframe');
    iframe.src = "https://player.vimeo.com/video/76979871";
    iframe.height = "300";
    iframe.width = "500";
    iframe.frameborder = "0";
    iframe.setAttribute('allowFullScreen', 'true');
    iframe.setAttribute('webkitallowfullscreen', 'true');
    iframe.setAttribute('mozallowfullscreen', 'true');
    iframe.style.cssText = "position: absolute;top: 40%;left: 40%;margin-top: -50px;margin-left: -50px;width: 500px;height: 300px; z-index: 90;";
    //<iframe src="https://player.vimeo.com/video/76979871" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    //var iframe = document.querySelector('iframe');
    var randomID = Math.random().toString();
    iframe.id = "Vimeo" + randomID.substring(2, randomID.length);
    document.getElementById('WholeWebsite').appendChild(iframe);
    var player = new Vimeo.Player(iframe);
    player.on('play', function() 
    {
        ////////////console.log('played the video!');
    });
    player.getVideoTitle().then(function(title) 
    {
        ////////////console.log('title:', title);
    });
    ////////////console.log("it comes in here ");
  }
  var player;
  var done = false;
  var EdittingVideoID = "";
  var AutoPlay = false;
  function CreateYoutubeVideo()
  {
    var div = document.createElement('div');
    var randomID = Math.random().toString();
    div.id = "Youtube" + randomID.substring(2, randomID.length);
    div.style.cssText = "position: absolute;top: 50%;left: 50%;margin-top: -50px;margin-left: -50px;width: 500px;height: 300px; z-index: 90;";
    document.getElementById('WholeWebsite').appendChild(div);
    EdittingVideoID = div.id;
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  function CreateYoutubeBox()
  {
    AutoPlay = false;
    var div = document.createElement('div');
    var randomID = Math.random().toString();
    div.id = "Youtube" + randomID.substring(2, randomID.length);
    div.style.cssText = "position: absolute;top: 300px;left: 500px;width: 500px;height: 300px; z-index: 90;";
    
    var img = document.createElement('img');
    img.src = "//img.youtube.com/vi/RzgVq8a468A/0.jpg";
    img.style.cssText = "width: 100%;height: 100%; z-index: -1; position: absolute;";
    img.id = div.id + "1";
    div.appendChild(img);

    var Videodiv = document.createElement('div');
    Videodiv.id = div.id + "12";
    Videodiv.style.cssText = "pointer-events: none; position: absolute; width: 100%;height: 100%; z-index: 90;";
    EdittingVideoID = Videodiv.id;
    div.appendChild(Videodiv);
    document.getElementById('WholeWebsite').appendChild(div);
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  }
  function CreateVimeoBox()
  {
    AutoPlay = false;
    var div = document.createElement('div');
    var randomID = Math.random().toString();
    div.id = "Vimeo" + randomID.substring(2, randomID.length);
    div.style.cssText = "position: absolute;top: 300px;left: 500px;width: 500px;height: 300px; z-index: 90;";
    
    var img = document.createElement('img');
    img.src = "//img.youtube.com/vi/RzgVq8a468A/0.jpg";
    img.style.cssText = "width: 100%;height: 100%; z-index: 90; position: absolute;";
    img.id = div.id + "1";
    div.appendChild(img);
    document.getElementById('WholeWebsite').appendChild(div);
    EdittingVideoID = img.id;
    vimeoLoadingThumb(76979871);

    var iframe = document.createElement('iframe');
    iframe.src = "https://player.vimeo.com/video/76979871";
    iframe.height = "300";
    iframe.width = "500";
    iframe.frameborder = "0";
    iframe.setAttribute('allowFullScreen', 'true');
    iframe.setAttribute('webkitallowfullscreen', 'true');
    iframe.setAttribute('mozallowfullscreen', 'true');
    iframe.setAttribute('loop', 'true');
    iframe.style.cssText = "pointer-events: none; position: absolute; width: 100%;height: 100%; z-index: 90;";
    iframe.id = div.id + "12";
    div.appendChild(iframe);
    var player = new Vimeo.Player(iframe);
    player.on('play', function() 
    {
        ////////////console.log('played the video!');
    });
    player.getVideoTitle().then(function(title) 
    {
        ////////////console.log('title:', title);
    });
    ////////////console.log("it comes in here ");
  }
  function CreateDailymotionBox()
  {
    AutoPlay = false;
    var div = document.createElement('div');
    var randomID = Math.random().toString();
    div.id = "Dailymotion" + randomID.substring(2, randomID.length);
    div.style.cssText = "position: absolute;top: 300px;left: 500px;width: 500px;height: 300px; z-index: 90;";
    
    var Videodiv = document.createElement('div');
    var randomID = Math.random().toString();
    Videodiv.id = div.id + "12";
    Videodiv.style.cssText = "pointer-events: none; position: absolute; width:100%, height:100%; z-index: 90;";
    div.appendChild(Videodiv);
    var player = DM.player(Videodiv, 
    {
        video: "xwr14q",
        width: "100%",
        height: "100%",
        params: {
            autoplay: false,
            loop: true,
            mute: true
        }
    });

    var img = document.createElement('img');
    img.src = "https://www.dailymotion.com/thumbnail/video/xwr14q";
    img.style.cssText = "width: 100%;height: 100%; z-index:-1; position: absolute;";
    img.id = div.id + "1";
    div.appendChild(img);

    document.getElementById('WholeWebsite').appendChild(div);
    EdittingVideoID = img.id;
  }
  function CreateFacebookBox()
  {
    AutoPlay = false;
    var FBdiv = document.createElement('div');
    FBdiv.id = "fb-root";
    FBdiv.style.cssText = "position: absolute;top: 300px;left: 500px;width: 500px;height: 300px; z-index: 90;";
    document.getElementById('WholeWebsite').appendChild(FBdiv);

    var div = document.createElement('div');
    var randomID = Math.random().toString();
    div.id = "Facebook" + randomID.substring(2, randomID.length);
    div.style.cssText = "position: absolute;top: 300px;left: 500px;width: 500px;height: 300px; z-index: 90;";
    
    var Videodiv = document.createElement('div');
    Videodiv.id = div.id + "12";
    Videodiv.className = "fb-video";
    Videodiv.style.cssText = "pointer-events: none; position: absolute; width: 100%; height: 100%; z-index: 90;";
    Videodiv.setAttribute('data-href','https://www.facebook.com/facebook/videos/10153231379946729/');
    Videodiv.setAttribute('data-width','500');
    Videodiv.setAttribute('data-allowfullscreen','true');
    Videodiv.setAttribute('data-loop','true');
    div.appendChild(Videodiv);
    //////////console.log("Here is the id1 " + Videodiv.id);
    var img = document.createElement('img');
    img.src = "https://graph.facebook.com/10153231379946729/picture";
    img.style.cssText = "width: 100%;height: 100%; z-index:-1; position: absolute;";
    img.id = div.id + "1";
    div.appendChild(img);
    document.getElementById('WholeWebsite').appendChild(div);
    EdittingVideoID = div.div;
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

  }
  function ChangeVideoButtonPressed()
  {
    AutoPlay = true;
    HideAllBoxes();
    document.getElementById(EdittingVideoID).style.display = "block"; 
    document.getElementById('EditVideoBoxMenu').style.display = "block";
    var ImageBox = document.getElementById('EditVideoBoxMenu'); 
    ImageBox.draggable = true;
    ImageBox.addEventListener('dragstart',drag_start,false); 
    ChosenIDForEditting = "EditVideoBoxMenu";
    ////////////console.log("Here is the video ID " + EdittingVideoID);
    if (EdittingVideoID.includes("Youtube"))
    {
        document.getElementById('ChangedVideoContent').innerHTML = "";
        document.getElementById('linkvideotextbutton').placeholder = "https://www.youtube.com/watch?v=RzgVq8a468A";
        var Videodiv = document.createElement('div');
        Videodiv.id = "YoutubeMenu";
        Videodiv.style.cssText = "width: 300px;height: 200px;";
        document.getElementById('ChangedVideoContent').appendChild(Videodiv);

        var Array = document.getElementById(EdittingVideoID).src.toString().split('embed/');
        var videoID = "RzgVq8a468A";
        if (Array.length == 2)
        {
          Array = Array[1].split('?');
          if (Array.length > 0)
          {
            videoID = Array[0];
          }
        } 
        player = new YT.Player(Videodiv.id, 
        {
          height: '200',
          width: '300',
          videoId: videoID,
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
    }
    else if (EdittingVideoID.includes("Dailymotion"))
    {
        document.getElementById('ChangedVideoContent').innerHTML = "";
        document.getElementById('linkvideotextbutton').placeholder = "http://www.dailymotion.com/video/xwr14q";
        var Videodiv = document.createElement('div');
        Videodiv.id = "DailymotionMenu";
        Videodiv.style.cssText = "width: 300px;height: 200px;";
        document.getElementById('ChangedVideoContent').appendChild(Videodiv);
        var Array = document.getElementById(EdittingVideoID).src.toString().split('video/');
        var videoID = "xwr14q";
        if (Array.length == 2)
        {
          Array = Array[1].split('?');
          if (Array.length > 0)
          {
            videoID = Array[0];
          }
        } 
        var player = DM.player(Videodiv, 
        {
            video: videoID,
            width: "100%",
            height: "100%",
            params: {
                autoplay: true,
                mute: true
            }
        });
    }
    else if (EdittingVideoID.includes("Vimeo"))
    {
        document.getElementById('ChangedVideoContent').innerHTML = "";
        document.getElementById('linkvideotextbutton').placeholder = "https://player.vimeo.com/video/76979871";
        var iframe = document.createElement('iframe');
        iframe.src = document.getElementById(EdittingVideoID).src;
        iframe.height = "300";
        iframe.width = "500";
        iframe.frameborder = "0";
        iframe.setAttribute('allowFullScreen', 'true');
        iframe.setAttribute('webkitallowfullscreen', 'true');
        iframe.setAttribute('mozallowfullscreen', 'true');
        iframe.style.cssText = "width: 300px;height: 200px;";
        iframe.id = "VimeoMenu";
        document.getElementById('ChangedVideoContent').appendChild(iframe);
        var player = new Vimeo.Player(iframe);
        player.on('play', function() 
        {
            ////////////console.log('played the video!');
        });
        player.getVideoTitle().then(function(title) 
        {
            ////////////console.log('title:', title);
        });
    }
    else if (EdittingVideoID.includes("Facebook"))
    {
        document.getElementById('ChangedVideoContent').innerHTML = "";
        document.getElementById('linkvideotextbutton').placeholder = "https://www.facebook.com/facebook/videos/10153231379946729/";
        var div = document.createElement('div');
        div.id = "FacebookMenu";
        div.className = "fb-video";
        div.style.cssText = "width: 300px;height: 200px;";
        div.setAttribute('data-href', $("#" + EdittingVideoID).attr("data-href"));
        div.setAttribute('data-width','500');
        div.setAttribute('data-allowfullscreen','true');
        document.getElementById('ChangedVideoContent').appendChild(div);
        FB.XFBML.parse();
    }
  }
  function FilterVideoURL()
  {
    var element  = document.getElementById('linkvideotextbutton');
    if (element.value != "")
    {
        if (EdittingVideoID.includes("Youtube"))
        {
            if (element.value.includes('https://www.youtube.com/watch?v='))
            {
                var videoID = element.value.split('v=');
                if (videoID.length == 2)
                {
                    //////////console.log("Here is the video ID " + videoID[1]);
                    document.getElementById('ChangedVideoContent').innerHTML = "";
                    document.getElementById('linkvideotextbutton').placeholder = "https://www.youtube.com/watch?v=RzgVq8a468A";
                    var Videodiv = document.createElement('div');
                    Videodiv.id = "YoutubeMenu";
                    Videodiv.style.cssText = "width: 300px;height: 200px;";
                    document.getElementById('ChangedVideoContent').appendChild(Videodiv);
                    player = new YT.Player(Videodiv.id, 
                    {
                      height: '200',
                      width: '300',
                      videoId: videoID[1],
                      events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onPlayerStateChange
                      }
                    });
                    AutoPlay = false;
                    //////////console.log("Here is the inner html " + document.getElementById(EdittingVideoID).outerHTML);
                    document.getElementById(EdittingVideoID).src = "https://www.youtube.com/embed/" + videoID[1] + "?enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A5000&amp;widgetid=1";
                    document.getElementById(EdittingVideoID.substring(0, EdittingVideoID.length-1)).src = "//img.youtube.com/vi/" + videoID[1] + "/0.jpg";
                
                }
                else
                {
                  AlertText = "Please enter a valid URL";
                  creationFailed();
                }
            }
            else
            {
              AlertText = "Please enter a valid URL";
              creationFailed();
            }
        }
        else if (EdittingVideoID.includes("Dailymotion"))
        {
            if (element.value.includes('http://www.dailymotion.com/video/'))
            {
                var videoID = element.value.split('video/');
                if (videoID.length == 2)
                {
                    //////////console.log("Here is the video ID " + videoID[1]);
                    var player = DM.player(document.getElementById('DailymotionMenu'), 
                    {
                        video: videoID[1],
                        width: "100%",
                        height: "100%",
                        params: {
                            autoplay: true,
                            mute: true
                        }
                    });
                    var player = DM.player(document.getElementById(EdittingVideoID), 
                    {
                        video: videoID[1],
                        width: "100%",
                        height: "100%",
                        params: {
                            autoplay: false,
                            mute: true
                        }
                    });
                }
                else
                {
                  AlertText = "Please enter a valid URL";
                  creationFailed();
                }
            }
            else
            {
              AlertText = "Please enter a valid URL";
              creationFailed();
            }
        }
        else if (EdittingVideoID.includes("Vimeo"))
        {
            if (element.value.includes('https://player.vimeo.com/video/'))
            {
                document.getElementById('VimeoMenu').src = element.value;
                var player = new Vimeo.Player(document.getElementById('VimeoMenu'));
                player.on('play', function() 
                {
                    ////////////console.log('played the video!');
                });
                player.getVideoTitle().then(function(title) 
                {
                    ////////////console.log('title:', title);
                });
                document.getElementById(EdittingVideoID).src = element.value;
            }
            else
            {
              AlertText = "Please enter a valid URL";
              creationFailed();
            }
        }
        else if (EdittingVideoID.includes("Facebook"))
        {
            if (element.value.includes('https://www.facebook.com/facebook/videos/'))
            {
                document.getElementById('FacebookMenu').setAttribute('data-href', element.value);
                document.getElementById(EdittingVideoID).setAttribute('data-href', element.value);
                var videoID = element.value.split('videos/');
                if (videoID.length == 2)
                {
                  document.getElementById(EdittingVideoID.substring(0, EdittingVideoID.length-1)).src = "https://graph.facebook.com/" + videoID[1] + "picture";
                }
                FB.XFBML.parse();
            }
            else
            {
              AlertText = "Please enter a valid URL";
              creationFailed();
            }
        }
    }
    else
    {
        AlertText = "Please enter a valid URL";
        creationFailed();
    }
  }
  function vimeoLoadingThumb(id)
  {    
    var url = "http://vimeo.com/api/v2/video/" + id + ".json?callback=showThumb";
    var id_img = "#" + EdittingVideoID;
    var script = document.createElement( 'script' );
    script.type = 'text/javascript';
    script.src = url;
    $(id_img).before(script);
}
function showThumb(data)
{
    var id_img = "#" + EdittingVideoID;
    $(id_img).attr('src',data[0].thumbnail_large);
}
  function onYouTubeIframeAPIReady() 
  {
    player = new YT.Player(EdittingVideoID, 
    {
      height: '390',
      width: '640',
      videoId: 'RzgVq8a468A',
      events: {
        'onReady': onPlayerReady,
        'loop': 1,
        'onStateChange': onPlayerStateChange
      }
    });
  }
  function onPlayerReady(event) 
  {
    if (AutoPlay)
    {
        event.target.playVideo();
    }
  }
  function onPlayerStateChange(event) 
  {
    if (event.data == YT.PlayerState.PLAYING && !done) 
    {
      done = true;
    }
  }
  function stopVideo() 
  {
    player.stopVideo();
  }
  function SetSideMenuBar(check)
  {
    if (sessionStorage.getItem('ImagesUploadedBox') == null || sessionStorage.getItem('ImagesUploadedBox') == "")
    {
       sessionStorage.setItem('ImagesUploadedBox', "<p>No Images Uploaded</p>");
    }
    if (check == 'text')
    {
      document.getElementById('rightsidemenu').innerHTML = "<a  onclick='CloseBox()'><img src='../../images/SideBar/closebutton.png'></a><p id='titleforsidemenu'><strong><b>Add Text</b></strong></p><br><p id='titleforsidemenuforp'><b>Titles</b></p><p id='titleforsidemenuforlinebreaker'></p><h1 style='text-align: center;' id='dragh1' contenteditable='true' draggable='true' ondragstart='drag_start(event)'>Site Title</h1><h2 style='text-align: center;' id='dragh2' contenteditable='true' draggable='true' ondragstart='drag_start(event)'>Large Heading</h2><h3 style='text-align: center;'>Medium Heading</h3><h4 style='text-align: center;'>Small Heading</h4><br><p id='titleforsidemenuforp'><b>Paragraphs</b></p><p id='titleforsidemenuforlinebreaker'></p><p style='text-align: left;font-family: 'Lato', sans-serif; padding-left: 20px;'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. Dolore magna aliquam erat volutpat.</h1>";
    }
    else if (check == 'image')
    {
      document.getElementById('rightsidemenu').innerHTML = "<a  onclick='CloseBox()'><img src='../../images/SideBar/closebutton.png'></a><p id='titleforsidemenu'><strong><b>Add Image</b></strong></p><br><p id='titleforsidemenuforp'><b>Uploaded Images</b></p><p id='titleforsidemenuforlinebreaker'></p><div id='UploadedImagesforSideMenu'>" + sessionStorage.getItem('ImagesUploadedBox') + "</div><br><p id='titleforsidemenuforp'><b>Our Images</b></p><p id='titleforsidemenuforlinebreaker'></p><div id='OurImagesForSideMenu'> <img src='../../images/work_1.jpg' id='dragwork1' draggable='true' ondragstart='drag_start(event)'> <img src='../../images/work_2.jpg' id='dragwork2' draggable='true' ondragstart='drag_start(event)'> <img src='../../images/work_3.jpg' id='dragwork3' draggable='true' ondragstart='drag_start(event)'><img src='../../images/work_4.jpg'><img src='../../images/work_5.jpg'> <img src='../../images/work_6.jpg'> <img src='../../images/work_7.jpg'> <img src='../../images/work_8.jpg'></div>";
    }
    else if (check == 'video')
    {
      document.getElementById('rightsidemenu').innerHTML = "<a  onclick='CloseBox()'><img src='../../images/SideBar/closebutton.png'>"
      + "</a><p id='titleforsidemenu'><strong><b>Add a Video</b></strong></p><br><p id='titleforsidemenuforp'>"
      + "<b>Social Player</b></p><p id='titleforsidemenuforlinebreaker'></p><div id='SocialPlayerForSideMenu'> "
      + "<a id='createvideo1' onclick='CreateYoutubeBox()' draggable='true' ondragstart='drag_start(event)'><img id='createvideo1' src='../../images/SideBar/Youtube.png'></a><a id='createvideo2' onclick='CreateVimeoBox()' draggable='true' ondragstart='drag_start(event)' ><img id='createvideo2' src='../../images/SideBar/Vimeo.png'></a>"
      + "<a id='createvideo3' onclick='CreateDailymotionBox()' draggable='true' ondragstart='drag_start(event)' ><img id='createvideo3' src='../../images/SideBar/Dailymotion.png'></a><a id='createvideo4' onclick='CreateFacebookBox()' draggable='true' ondragstart='drag_start(event)'><img id='createvideo4' src='../../images/SideBar/Facebook.png'></a></div><br>";
    }
    else if (check == 'button')
    {
      document.getElementById('rightsidemenu').innerHTML = "<div id='rightsidemenu'>"
    + "<a onclick='CloseBox()'><img src='../../images/SideBar/closebutton.png'></a>"
    + "<p id='titleforsidemenu'><strong><b>Add Button</b></strong></p><br>"
    + "<div id='ButtonMenuForSideMenu'>"
    + "<a id='sidemenubutton1' href='#' draggable='true' ondragstart='drag_start(event)' class='action-button shadow red' style='width: 130px; height: 50px; text-decoration: none; float: left; margin-left: 15px; margin-top: 20px;'>How</a>"
    + "<a id='sidemenubutton2' href='#' draggable='true' ondragstart='drag_start(event)' class='action-button shadow blue' style='width: 130px; height: 50px; text-decoration: none; float: right; margin-top: 20px;'>Hello</a>"
    + "<a id='sidemenubutton3' href='#' draggable='true' ondragstart='drag_start(event)' class='action-button shadow yellow' style='width: 130px; height: 50px; text-decoration: none; float: left; margin-left: 15px; margin-top: 20px;'>You?</a>"
    + "<a id='sidemenubutton4' href='#' draggable='true' ondragstart='drag_start(event)' class='action-button shadow green' style='width: 130px; height: 50px; text-decoration: none; float: right; margin-top: 20px;'>Are</a>"
    + "<a id='sidemenubutton5' href='#' draggable='true' ondragstart='drag_start(event)' class='FlashyStylebutton' style='width: 120px; height: 50px; text-decoration: none; float: left; margin-left: 15px; margin-top: 20px;'>Recommend</a>"
    + "<a id='sidemenubutton6' href='#' draggable='true' ondragstart='drag_start(event)' class='FlashyStylebutton FlashyStylegray' class='FlashyStylegray' style='width: 120px; height: 50px; text-decoration: none; float: right; margin-top: 20px;'>Another one</a>"
    + "<a id='sidemenubutton7' href='#' draggable='true' ondragstart='drag_start(event)' class='FlashyStylebutton FlashyStyleblue' class='FlashyStyleblue' style='width: 80px; height: 80px; text-decoration: none; border-radius: 40px; padding-top: 30px; margin-left: 30px; float: left; margin-top: 20px;'>Circle</a>"
    + "<a id='sidemenubutton8' href='#' draggable='true' ondragstart='drag_start(event)' class='FlashyStylebutton FlashyStyleblue' class='FlashyStyleblue' style='width: 120px; margin-top: 20px; height: 80px; text-decoration: none; border-radius: 10px; margin-left: 0px; float: right; padding-top: 30px; margin-top: 20px;'>Corner Radius</a>"
    + "<a id='sidemenubutton9' draggable='true' ondragstart='drag_start(event)' class='VoidStylebutton btn-danger' style='width: 120px; height: 50px; text-decoration: none; float: left; margin-left: 15px; margin-bottom: 50px; margin-top: 20px;'>What we do</a>"
    + "<a id='sidemenubutton10' draggable='true' ondragstart='drag_start(event)' class='VoidStylebutton' style='width: 120px; height: 50px; text-decoration: none; float: right; margin-bottom: 50px; margin-top: 20px;'>Talk to us</a>"
    + "</div></div>"
    }
  }
  function GetWebsiteContent()
  {
        var NameOfPage = "Main Page";
        if (sessionStorage.getItem('NameOfPage') != "")
        {
             NameOfPage = sessionStorage.getItem('NameOfPage');
        }
        //////console.log("Here is the get website2 " + NameOfPage);
        $.ajax({
            url: '../../api/getWebsiteContent',
            type: 'GET',
            headers: {
                "Email" : sessionStorage.getItem('email'),
                "Page" : sessionStorage.getItem('EditingPage'),
                "WebName" : sessionStorage.getItem('PageName'),
                'token': sessionStorage.getItem('token')
            },
            cache: false,
            dataType: 'json',
            success: function(response) {
                var status = response['status'];
                ////console.log("Resposne " + JSON.stringify(response));
                if (status == 200)
                {
                    var result = JSON.parse(response['response']);
                    var pagenames = result['pagenames'];
                    var htmlPage = result['html'];
                    var element = document.getElementById('ListForContentOfPagesForSideMenu');
                    element.innerHTML = "";
                    //////////////////////////////console.log("Here is the number of pages " + JSON.stringify(result));
                    var pageIndex = pagenames.indexOf(NameOfPage);
                    var html = "";
                    if (pageIndex > -1 && htmlPage.length > 0)
                    {
                      html = htmlPage[pageIndex];
                      var string = JSON.parse("[" + html + "]");
                      html = LZW.decompress(string);
                      if (html == null || html == "")
                      {
                          html = htmlPage[0];
                      }
                    }
                    else if (htmlPage.length > 0)
                    {
                          html = htmlPage[0];
                          var string = JSON.parse("[" + html + "]");
                          html = LZW.decompress(string);
                          if (html == null || html == "")
                          {
                              html = htmlPage[0];
                          }
                    }
                    if (htmlPage.length > 0 && sessionStorage.getItem('AddedNewTab') != "true")
                    {
                          html = html.replaceAll("\\n", "\n");
                          html = html.replaceAll("\\t", "\t");
                          html = html.replaceAll("\\", "");
                          var index = html.indexOf("<");
                          if (index != 0)
                          {
                              html = html.substr(index, html.length-3);
                          }
                          var htmlIndex = html.indexOf("</footer>");
                          if (htmlIndex > -1)
                          {
                              html = html.substr(0, htmlIndex) + "</footer></div>";
                          }
                          ////console.log("It should reload here 2534");
                          //console.log("Sample is: " + html);
                          document.getElementById("WholeWebsite").outerHTML = html;
                          //$.getScript("../../js/sidebar.js");
                          if (Preview)
                          {
                              SetAllTextToNonEditable();
                          }
                          else
                          {
                              SetAllTextToEditable();
                          }
                    }
                  for (var i = 0; i < pagenames.length; i++) 
                  {
                      var li = document.createElement("li");
                      var a = document.createElement("a");
                      a.onclick = function(){ ChangePage(this); };
                      a.innerHTML = pagenames[i] + "<img src='../../images/SideBar/SettingsButton.png'>";
                      li.appendChild(a);
                      element.appendChild(li);
                  }
                  if (sessionStorage.getItem('AddedNewTab') == "true")
                  {
                    sessionStorage.setItem('AddedNewTab', '');
                    var element = document.getElementById('ListForContentOfPagesForSideMenu');
                    var li = document.createElement("li");
                    var a = document.createElement("a");
                    a.onclick = function(){ ChangePage(this); };
                    a.innerHTML = "New Page " + (parseInt(document.getElementById("ListForContentOfPagesForSideMenu").getElementsByTagName("li").length) + 1) + "<img src='../../images/SideBar/SettingsButton.png'>";
                    li.appendChild(a);
                    element.appendChild(li);
                  }
                  SetButtons();
                }
            }
        });
  }
  function BringToFront(item)
  {
    var element = "";
    if (item.id.toString().includes("12text"))
    {
      SaveStyleBeforeChanges(EdittingTextID);
      element = document.getElementById(EdittingTextID);
      ////////////////////console.log("It should come in here ");
    }
    else
    {
      SaveStyleBeforeChanges(EdittingImageID);
      element = document.getElementById(EdittingImageID);
    }
    ////////////////////console.log("Here is the z index before " + element.style.zIndex);
    element.style.zIndex = '98';
    //////////////////////console.log("Here is the z index " + element.style.zIndex);
    ////////////////////console.log("Here is outer html text " + document.getElementById(EdittingImageID).outerHTML);
    ////////////////////console.log("Here is outer html image " + document.getElementById(EdittingTextID).outerHTML);
    //////////////////////console.log("Here is outer id " + element.id);
    document.getElementById('EditTextButtonAndMenuForRightClick').style.display = "none";
    document.getElementById('EditImageButtonAndMenuForRightClick').style.display = 'none';
  }
  function BringForward(item)
  {
    var element = "";
    if (item.id.toString().includes("12text"))
    {
      SaveStyleBeforeChanges(EdittingTextID);
      element = document.getElementById(EdittingTextID);
    }
    else
    {
      SaveStyleBeforeChanges(EdittingImageID);
      element = document.getElementById(EdittingImageID);
    }
    ////////////////////console.log("Here is the z index before " + element.style.zIndex);
    if (element.style.zIndex.toString() == null || element.style.zIndex.toString() == "")
    {
      element.style.zIndex = '90';
    }
    else if (element.style.zIndex.toString() == '90')
    {
      element.style.zIndex = '98';
    }
    else if (element.style.zIndex.toString() == '50')
    {
      element.style.zIndex = '90';
    }
    else if (element.style.zIndex.toString() == '-1')
    {
      element.style.zIndex = '50';
    }
    document.getElementById('EditTextButtonAndMenuForRightClick').style.display = "none";
    document.getElementById('EditImageButtonAndMenuForRightClick').style.display = 'none';
  }
  function BringToBack(item)
  {
    var element = "";
    if (item.id.toString().includes("12text"))
    {
      SaveStyleBeforeChanges(EdittingTextID);
      element = document.getElementById(EdittingTextID);
    }
    else
    {
      SaveStyleBeforeChanges(EdittingImageID);
      element = document.getElementById(EdittingImageID);
    }
    element.style.zIndex = '-1';
    document.getElementById('EditTextButtonAndMenuForRightClick').style.display = "none";
    document.getElementById('EditImageButtonAndMenuForRightClick').style.display = 'none';
  }
  function BringBackward(item)
  {
    var element = "";
    if (item.id.toString().includes("12text"))
    {
      SaveStyleBeforeChanges(EdittingTextID);
      element = document.getElementById(EdittingTextID);
    }
    else
    {
      SaveStyleBeforeChanges(EdittingImageID);
      element = document.getElementById(EdittingImageID);
    }
    ////////////////////console.log("Here is the z index before " + element.style.zIndex);
    if (element.style.zIndex.toString() == null || element.style.zIndex.toString() == "")
    {
      element.style.zIndex = '90';
    }
    else if (element.style.zIndex.toString() == '90')
    {
      element.style.zIndex = '50';
    }
    else if (element.style.zIndex.toString() == '50')
    {
      element.style.zIndex = '20';
    }
    else if (element.style.zIndex.toString() == '98')
    {
      element.style.zIndex = '90';
    }
    else if (element.style.zIndex.toString() == '20')
    {
      element.style.zIndex = '-1';
    }
    ////////////////////console.log("Here is the z index after " + element.style.zIndex);
    document.getElementById('EditTextButtonAndMenuForRightClick').style.display = "none";
    document.getElementById('EditImageButtonAndMenuForRightClick').style.display = 'none';
  }
  function DeletePage()
  {
      var NameOfPage = sessionStorage.getItem('SavedNameOfPage');
      var element = document.getElementById('ListForContentOfPagesForSideMenu');
      document.getElementById('sidemenuforpagemenuSettings').style.display = "none";
      //var pageIndex = pagenames.indexOf(NameOfPage);
      $('#ListForContentOfPagesForSideMenu li').each(function(i, element)
      {
        if (element.innerHTML.includes(NameOfPage))
        {
            ////////////////////console.log("Here is the index " + element.innerHTML);
            element.parentNode.removeChild(element);
        }
        else
        {
            var current = $(this);
            if(current.children().size() > 0) 
            {
                var emptyULtest = current.children()[0].innerHTML;
                var index = emptyULtest.indexOf("<");
                if (index > -1)
                {
                  sessionStorage.setItem('NameOfPage', emptyULtest.substring(0, index));
                }

            }
        }
      });
      $.ajax({
          url: '../../api/DeletePage',
          type: 'GET',
          headers: {
              "Email" : sessionStorage.getItem('email'),
              "Page" : sessionStorage.getItem('EditingPage'),
              "WebName" : sessionStorage.getItem('PageName'),
              "PageID": NameOfPage,
                'token': sessionStorage.getItem('token')
          },
          cache: false,
          dataType: 'json',
          success: function(response) 
          {
              //var status = response['status'];
              ////////////////////console.log("Resposne " + JSON.stringify(response));
              AlertText = "Page has been deleted successfully";
              CreationSucceeded();
          }
      });
  }
  function SavePageSettingsDetails()
  {
      var NameOfPage = sessionStorage.getItem('SavedNameOfPage');
      sessionStorage.setItem('NameOfPage', NameOfPage);
      $('#ListForContentOfPagesForSideMenu li').each(function(i, element)
      {
        if (element.innerHTML.includes(NameOfPage))
        {
            var current = $(this);
            if(current.children().size() > 0) 
            {
                var emptyULtest = current.children()[0].innerHTML;
                var index = emptyULtest.indexOf("<");
                if (index > -1)
                {
                    current.children()[0].innerHTML = document.getElementById('nameofpageforsidemenuSettings').value + emptyULtest.substring(index, emptyULtest.length);
                }

            }
        }
      });
      $.ajax({
          url: '../../api/SavePageSettingsDetails',
          type: 'GET',
          headers: {
              "Email" : sessionStorage.getItem('email'),
              "Page" : sessionStorage.getItem('EditingPage'),
              "WebName" : sessionStorage.getItem('PageName'),
              "PageID": NameOfPage,
              "NameOfPage": document.getElementById('nameofpageforsidemenuSettings').value,
                'token': sessionStorage.getItem('token')
          },
          cache: false,
          dataType: 'json',
          success: function(response) {
                  var status = response['status'];
                  ////////////////////console.log("Resposne " + JSON.stringify(response));
              }
      });
  }
  function GoToThisPage()
  {
      var NameOfPage = sessionStorage.getItem('SavedNameOfPage');
      sessionStorage.setItem('NameOfPage', NameOfPage);
      document.getElementById('nameofpageforsidemenuSettings').value = NameOfPage;
      ////console.log("Here is the element inner html " + NameOfPage);
      location.reload();
  }
  function ChangePage(element)
  {
      document.getElementById('sidemenuforpagemenuSettings').style.display = "block";
      var index = element.innerHTML.toString().indexOf("<");
      var NameOfPage = element.innerHTML.toString().substring(0, index);
      sessionStorage.setItem('SavedNameOfPage', NameOfPage);
      document.getElementById('nameofpageforsidemenuSettings').value = NameOfPage;
  }
  function MakeAllImagesNotResizable()
  {
      if (EdittingImageID != "" && EdittingImageID != null)
      {
        $('#' + EdittingImageID).each(function(i, element)
        {
          $(this).resizable({ disabled: true });
          $(this).resizable('destroy');
        });
      }
  }
  function SaveChanges()
  {
    MakeAllImagesNotResizable();
    var NameOfPage = "Main Page";
    if (sessionStorage.getItem('NameOfPage') != "" && sessionStorage.getItem('NameOfPage') != null)
    {
         NameOfPage = sessionStorage.getItem('NameOfPage');
    }
    else
    {
      $("#ListForContentOfPagesForSideMenu li a").first().each(function(i, element)
      {
        var index = element.innerHTML.indexOf("<");
        if (index > -1)
        {
          sessionStorage.setItem('NameOfPage', element.innerHTML.substring(0, index));
          NameOfPage = element.innerHTML.substring(0, index);
        }
      });
    }
    //////console.log("Here is the name of the page for saved changes " + NameOfPage);
    var string = document.getElementById("WholeWebsite").outerHTML;
    //console.log("Size of sample is: " + string.length);
    var compressed = LZW.compress(string);
    $('html, body').animate({ scrollTop: 0 }, 'fast');
        $.ajax({
            url: '../../api/SaveChangesToWebsite',
            type: 'GET',
        data: {
            "Email" : sessionStorage.getItem('email'),
            "Page" : sessionStorage.getItem('EditingPage'),
            "NameOfPage" : NameOfPage,
            "WebName" : sessionStorage.getItem('PageName'),
            "HTML" : compressed.toString(),
            'token': sessionStorage.getItem('token')
        },
        cache: false,
        dataType: 'json',
            success: function(response) 
            {
                var status = response['status'];
                if (status == 200)
                {
                  AlertText = "Page has been saved successfully";
                  CreationSucceeded();
                }
                else
                {
                  ////console.log("Here is the response 2 " + JSON.stringify(response));
                }
            },
            error: function(response) {
                //var status = response['status'];
                ////console.log("Here is the response 3 " + JSON.stringify(response));
            }
        });
  }
  var LZW = {
    compress: function (uncompressed) {
        "use strict";
        // Build the dictionary.
        var i,
            dictionary = {"0":48,"1":49,"2":50,"3":51,"4":52,"5":53,"6":54,"7":55,"8":56,"9":57,"\u0000":0,"\u0001":1,"\u0002":2,"\u0003":3,"\u0004":4,"\u0005":5,"\u0006":6,"\u0007":7,"\b":8,"\t":9,"\n":10,"\u000b":11,"\f":12,"\r":13,"\u000e":14,"\u000f":15,"\u0010":16,"\u0011":17,"\u0012":18,"\u0013":19,"\u0014":20,"\u0015":21,"\u0016":22,"\u0017":23,"\u0018":24,"\u0019":25,"\u001a":26,"\u001b":27,"\u001c":28,"\u001d":29,"\u001e":30,"\u001f":31," ":32,"!":33,"\"":34,"#":35,"$":36,"%":37,"&":38,"'":39,"(":40,")":41,"*":42,"+":43,",":44,"-":45,".":46,"/":47,":":58,";":59,"<":60,"=":61,">":62,"?":63,"@":64,"A":65,"B":66,"C":67,"D":68,"E":69,"F":70,"G":71,"H":72,"I":73,"J":74,"K":75,"L":76,"M":77,"N":78,"O":79,"P":80,"Q":81,"R":82,"S":83,"T":84,"U":85,"V":86,"W":87,"X":88,"Y":89,"Z":90,"[":91,"\\":92,"]":93,"^":94,"_":95,"`":96,"a":97,"b":98,"c":99,"d":100,"e":101,"f":102,"g":103,"h":104,"i":105,"j":106,"k":107,"l":108,"m":109,"n":110,"o":111,"p":112,"q":113,"r":114,"s":115,"t":116,"u":117,"v":118,"w":119,"x":120,"y":121,"z":122,"{":123,"|":124,"}":125,"~":126,"":127,"":128,"":129,"":130,"":131,"":132,"":133,"":134,"":135,"":136,"":137,"":138,"":139,"":140,"":141,"":142,"":143,"":144,"":145,"":146,"":147,"":148,"":149,"":150,"":151,"":152,"":153,"":154,"":155,"":156,"":157,"":158,"":159," ":160,"¡":161,"¢":162,"£":163,"¤":164,"¥":165,"¦":166,"§":167,"¨":168,"©":169,"ª":170,"«":171,"¬":172,"­":173,"®":174,"¯":175,"°":176,"±":177,"²":178,"³":179,"´":180,"µ":181,"¶":182,"·":183,"¸":184,"¹":185,"º":186,"»":187,"¼":188,"½":189,"¾":190,"¿":191,"À":192,"Á":193,"Â":194,"Ã":195,"Ä":196,"Å":197,"Æ":198,"Ç":199,"È":200,"É":201,"Ê":202,"Ë":203,"Ì":204,"Í":205,"Î":206,"Ï":207,"Ð":208,"Ñ":209,"Ò":210,"Ó":211,"Ô":212,"Õ":213,"Ö":214,"×":215,"Ø":216,"Ù":217,"Ú":218,"Û":219,"Ü":220,"Ý":221,"Þ":222,"ß":223,"à":224,"á":225,"â":226,"ã":227,"ä":228,"å":229,"æ":230,"ç":231,"è":232,"é":233,"ê":234,"ë":235,"ì":236,"í":237,"î":238,"ï":239,"ð":240,"ñ":241,"ò":242,"ó":243,"ô":244,"õ":245,"ö":246,"÷":247,"ø":248,"ù":249,"ú":250,"û":251,"ü":252,"ý":253,"þ":254,"ÿ":255},
            c,
            wc,
            w = "",
            result = [],
            dictSize = 256;
        for (i = 0; i < uncompressed.length; i += 1) {
            c = uncompressed.charAt(i);
            wc = w + c;
            //Do not use dictionary[wc] because javascript arrays 
            //will return values for array['pop'], array['push'] etc
           // if (dictionary[wc]) {
            if (dictionary.hasOwnProperty(wc)) {
                w = wc;
            } else {
                result.push(dictionary[w]);
                // Add wc to the dictionary.
                dictionary[wc] = dictSize++;
                w = String(c);
            }
        }
 
        // Output the code for w.
        if (w !== "") {
            result.push(dictionary[w]);
        }
        return result;
    },
 
 
    decompress: function (compressed) {
        "use strict";
        // Build the dictionary.
        var i,
            dictionary = [],
            w,
            result,
            k,
            entry = "",
            dictSize = 256;
        for (i = 0; i < 256; i += 1) {
            dictionary[i] = String.fromCharCode(i);
        }
        
        w = String.fromCharCode(compressed[0]);
        result = w;
        //console.log("Here is the w " + w);
        for (i = 1; i < compressed.length; i += 1) 
        {
            k = compressed[i];
            if (dictionary[k]) 
            {
                entry = dictionary[k];
            } 
            else 
            {
                if (k === dictSize) 
                {
                    entry = w + w.charAt(0);
                } 
                else 
                {
                    return null;
                }
            }
 
            result += entry;
 
            // Add w+entry[0] to the dictionary.
            dictionary[dictSize++] = w + entry.charAt(0);
 
            w = entry;
        }
        return result;
    }
};
  function PublishPage()
  {
        AlertText = "Page has been published successfully";
        CreationSucceeded();
  }
  function CreationSucceeded()
  {
    swal({
      title: AlertText,
      text: "",
      type: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then(function () {
      if (AlertText == "Page has been deleted successfully")
      {
        location.reload();
      }
    })
  }
  function creationFailed() 
  {
    swal({
      title: "Failed",
      text: AlertText,
      icon: "error",
      button: "OK",
    });
  }