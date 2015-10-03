			$(document).on("click","#btn_submit",function(){
				$( "#login" ).validate({
					rules: {
						username: {
						required: true
						},
						password: {
						required: true
						}
					},
					errorPlacement: function( error, element ) {
					error.insertAfter( element.parent() );
					},
					submitHandler: function (form) {
						var pass=$("#password").val();
						var username=$("#username").val();
						var usr_usertype=$("#usr_usertype").val();
					//	var	key="This is a private key"+pass;
					//	encrypt= rc4(key, pass);
						//$("#password").val(encrypt);
					  
					   //var formData="username="+username+"&usr_usertype="+usr_usertype+"&key="+key+"&encrypt="+encrypt;
						var formData="username="+username+"&usr_usertype="+usr_usertype+"&password="+pass;
                            $.ajax({
								type: "GET",
								url:base_url+"checklogin",
								beforeSend: function() { $.mobile.loading( 'show' ) }, //Show spinner
								complete: function() { $.mobile.loading( 'hide' ) }, //Hide spinner
								async: 'true',
								cache: false,
								dataType: 'json',
								data: formData,
								success: onSuccess,
								error: onError
							});
					}
				});
			});
		function onSuccess(data)
        { 
		   
			if(data.status== '1')
			{
				localStorage.userId= data.userId;
				localStorage.username= data.username;
				$("#ok").attr("href", 'admin_dashboard.html');
				$("#pop_msg_reset").popup('open');
				$('#pop_msg_reset p').text('Login Successfully ');
				
				/*navigator.notification.confirm("Login"+data.username+" Successfully",registrationCallBack, "Confirmation", "Ok");
					$.mobile.loading('show');
					function registrationCallBack(button){
				$.mobile.loading('hide');
					if(button == 1) {
						window.location.href = 'admin_dashboard.html';
					}
				}*/ 
				}
			else if(data.status== '0'){
				alert("Login Fail:Invalid Username or Password");
				/*navigator.notification.alert(
						'Invalid Username or Password',  // message
						 null,         // callback
						'Login Fail:',            // title
						'Ok'                  // buttonName
				);*/ 
				} 
			else if(data.status== '2'){
				alert("You are not registered");
				/*navigator.notification.alert(
					'You are not registered',  // message
					null,         // callback
					'Login Fail:',            // title
					'Ok'                  // buttonName
					);*/
			}
			else if(data.status== '3'){
				alert("Please Check your UserType");
				/*navigator.notification.alert(
					'Please Check your UserType',  // message
					null,         // callback
					'Login Fail:',            // title
					'Ok'                  // buttonName
					);*/
				
				}
	
         }
         function onError(data, status)
         { alert("Connection error");
			/*navigator.notification.alert(
			'Error',  // message
			null,         // callback
			'Something went wrong:',            // title
			'Ok'                  // buttonName
			);*/
         }  
