var user_id;
$(document).ready(function(){
	   if(!localStorage.userId)
			{
			  window.location="index.html";
			}
		else{
	         user_id= localStorage.userId;
	         var companyname= localStorage.username;
			 $("#username").text(companyname);
			 $("#username1").text(companyname);
			$('#user').html(companyname);
			$('#Id').val(user_id);
			}
			window.location.hash="#dashboard";
	});
	$(document).on('click','#self_profile',function(){
		//alert(user_id);
		seteditprofile(user_id);	
		});
		
	function seteditprofile(user_id){
			$.ajax({
				type:"GET",
				url:base_url+"editprofile/"+user_id,
				dataType:"json",
				success:function(data){
					$.each(data,function(value,item){
						$("#edit_profile_form #userId").val(item.Id);
						$("#edit_profile_form #usr_name").val(item.usr_name);
					    $("#edit_profile_form #usr_username").val(item.usr_username);
					    $('#edit_profile_form #usr_username').attr('readonly', 'true');
						$('#edit_profile_form #usr_username').css('background-color' , '#DEDEDE');
						$("#edit_profile_form #usr_email").val(item.usr_mail);
					});
				},
				error: onError
			});
		}
		
		//**** update profile*******//	
	$(document).on("click","#updateprofile",function(){
		//alert(user_id);
		var id=user_id;
		$("#edit_profile_form").validate({
			 rules: {
			    usr_name:{
					required:true
				},
				usr_email:{
					required:true,
					email:true
				},
				usr_password:{
					required:true
				},
				c_password:{
					required:true,
					equalTo:usr_password
				}
			 },
			 errorPlacement: function( error, element ) {
				error.insertAfter( element.parent() );
			},
			submitHandler: function (form) {
			   var formdata = $("#edit_profile_form").serialize();
			  $.ajax({
					type:"GET",
					url:base_url+"updateprofile/"+id,
					data:formdata,
					success:function(data){
					if(data==1){
							$('#edit_profile_form #usr_password').val('');
							$('#edit_profile_form #c_password').val('');
							window.location.hash="#dashboard";
					/*navigator.notification.confirm("Update Successfully",updateCallBack, "Confirmation", "Ok");
					$.mobile.loading('show');
					function updateCallBack(button){
					$.mobile.loading('hide');
					if(button == 1) {
						//window.location.href = 'admin_dashboard.html';
						$('#edit_profile_form #usr_password').val('');
						$('#edit_profile_form #c_password').val('');
						window.location.hash="#dashboard";
					}
				} */
			}
		},
					error: onError
				});
				
           	}	
			
		});
		
		
	});
	$(document).on("click","#cancle",function(){
		window.location.hash="#dashboard";
	});
	
    //*****ON CLICK OF CHANGE PASSWORD*****///
		$(document).on("click",'#change_pass_save',function(){
			//var Id=$("#Id").val();
			var Id=user_id;
			//alert(Id);
			$('#change_pass_form').validate({
			rules: {
				js_exist_pass:{
					required:true
				},
				js_new_pass:{
					required:true
				},
				js_new_pass_c:{
					required:true,
					equalTo:js_new_pass
				}
			},
			errorPlacement: function( error, element ) {
			error.insertAfter( element.parent() );
			},
			submitHandler: function (form) {
				var formdata= $('#change_pass_form').serialize();
			$.ajax({
				type:"GET",
				url:base_url+"changepassword/"+Id,
				async: "true",
				cache: false,
				dataType:"json",
				data:formdata,
				success:function(data){
					//alert(data.status);
					if(data.status=="1")
					{
					  // alert(data.msg);
					 // window.location.hash = "#dashboard";
						//window.location.reload();
						jAlert(data.msg, 'Alert Dialog',function(r){
							if(r==true){
								window.location.hash = "#dashboard";
								window.location.reload();
							}
						});
					/*navigator.notification.confirm(data.msg,changepassCallBack, "Confirmation", "Ok");
					$.mobile.loading('show');
					function changepassCallBack(button){
					$.mobile.loading('hide');
					if(button == 1) {
						window.location.hash = "#dashboard";
						window.location.reload();
					}
				 } */
					}
					else
					{
						// alert(data.msg);
						jAlert(data.msg, 'Alert Dialog',function(r){
							if(r==true){}
						});
						//navigator.notification.alert(data.msg,  null, 'Wrong Password:', 'Ok'); 
					}
				},
				error: onError
			});
			}
		});
		});
			
		//-------Logout -----------//
	$(document).on('click','#logout',function(){
		localStorage.removeItem("userId");
		localStorage.removeItem("username");
		localStorage.removeItem("cntr_Id");
	});
	
	function onError(data, status)
         {  alert("error");
			/*navigator.notification.alert(
			'Error',  // message
			null,         // callback
			'Something went wrong:',            // title
			'Ok'                  // buttonName
			);*/
         }  
	
			