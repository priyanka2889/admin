	
	
	$(document).ready(function(){
	   if(!localStorage.userId)
			{
			  window.location="index.html";
			}
		else{
	         user_id= localStorage.userId;
	         companyname= localStorage.username;
			 $("#Id").val(user_id);
			$('#user').html(companyname);
			}
			window.location.hash = "#jobtype_page";
		 });
	
	$(document).on('click','#add_jobtype_submit',function(){
		$('#add_jobtype_form').validate({
			rules: {
				jt_type:{
					required:true
				}
			},
			errorPlacement: function( error, element ) {
			error.insertAfter( element.parent() );
			},
			submitHandler: function (form) {
				var formdata= $('#add_jobtype_form').serialize();
				$.ajax({
						type:"GET",
						url:base_url+"jobtype/create",
						cache: false,
						data:formdata,
						dataType:"json",
						success:function(data){
							if(data==1)
							{
							alert("Added Successfully");
							$('input').not('[type="button"]').val(''); 
							refreshPage();
							/*navigator.notification.confirm("Added Successfully",addcallback, "Confirmation", "Ok");
							$.mobile.loading('show');
							function addcallback(button){
								$.mobile.loading('hide');
								if(button == 1) {
									window.location.hash = "#jobtype_page";
									window.location.reload();
							     $('input').not('[type="button"]').val(''); 
								}
							} */
							}		
						},
						error: onError
					});
			}
		});//validation close
	});
	
	
	
	
	//*****ON LOADING THE JOB TYPE PAGE*****///
		$(document).on("pageinit",'#jobtype_page',function(){
			$.ajax({
				type:"GET",
				url:base_url+"listjobtypes",
				beforeSend: function() { $.mobile.loading( 'show' ) }, //Show spinner
				complete: function() { $.mobile.loading( 'hide' ) }, //Hide spinner
				async: "true",
				cache: false,
				dataType:"json",
				success:jobtype_listview,
				error: onError  
			});
		});
		
		function jobtype_listview(data){
			$("#jobtype_list").empty();
			$.each(data,function(i,item) 
			{
				$("#jobtype_list").append("<li Id="+item.Id+">"+item.jt_type+"<span data-type='horizontal' style='float:right'><a class='jobtype_edit ui-btn ui-icon-edit ui-corner-all ui-btn-icon-notext ui-btn-inline' title='Edit'  href='#edit_jobtype_page' data-ajax='false'>Edit</a><a class='jobtype_delete ui-btn ui-icon-delete ui-corner-all ui-btn-icon-notext ui-btn-inline' title='Delete' data-ajax='false'>Delete</a></span></li>");
				$("#jobtype_list").listview('refresh');
				
				
			});			
		}
		
		////EDITING////
		$(document).on('click','.jobtype_edit',function(){
			var listitem = $( this ).parent().parent("li");
				var Id =listitem.attr('Id');
				//alert(Id);
			$.ajax({
				type:"GET",
				url:base_url+"jobtype/"+Id+"/edit",
				cache:false,
				dataType:"json",
				success:function sucess(item){
					$("#edit_Id").val(item.Id);
					$("#edit_jt_type").val(item.jt_type);
				},
				error: onError
				});
		});
		
		//////DELETING//////
		$(document).on('click','.jobtype_delete',function(){
			var listitem = $( this ).parent().parent("li");
				var Id =listitem.attr('Id');
				$.alerts.okButton = ' Yes ';
			$.alerts.cancelButton = ' No ';
			jConfirm('Are you sure you want to delete this record?', 'Confirm',function(r) {
                if (r == false)
                {
                   //alert('No Clicked');
                }
                else
                {//alert('Yes Clicked');
			$.ajax({
				type:"DELETE",
				url:base_url+"jobtype/"+Id,
				cache:false,
				dataType:"json",
				success:function sucess(data){
					//alert(data);
					//refreshPage();
					listitem.remove();
				},
				error: onError
				});
				}
			});
			
			/*navigator.notification.confirm('Are you sure you want to delete this record?',deleteCallBack, "Confirmation", ['Yes','NO']);
					$.mobile.loading('show');
					function deleteCallBack(button){
					$.mobile.loading('hide');
					if(button == 2) {
						
					}
					else if(button == 1){
					$.ajax({
					type:"DELETE",
					url:base_url+"jobtype/"+Id,
					cache:false,
					dataType:"json",
					success:function sucess(data){
					//alert(data);
					//refreshPage();
					listitem.remove();
				},
				error: onError
				});
					}
				} */
		});
		
		
		
		$(document).on('click','#edit_jobtype_submit',function(){
		$('#edit_jobtype_form').validate({
			rules: {
				jt_type:{
					required:true
				}
			},
			errorPlacement: function( error, element ) {
			error.insertAfter( element.parent() );
			},
			submitHandler: function (form) {
				var formdata= $('#edit_jobtype_form').serialize();
				var Id=$("#edit_Id").val();
				$.ajax({
						type:"PUT",
						url:base_url+"jobtype/"+Id,
						cache: false,
						data:formdata,
						dataType:"json",
						success:function(data){
							//navigator.notification.confirm("Updated Successfully",refreshPage, "Confirmation", "Ok");//alert(data);
							refreshPage();
						},
						error: onError
					});
			}
		});//validation close
	});
		
		
		function refreshPage(){ 
			window.location.hash = "#jobtype_page";
			window.location.reload();
		}
		function onError(data, status)
         {alert("error");
			/*navigator.notification.alert(
			'Error',  // message
			null,         // callback
			'Something went wrong:',            // title
			'Ok'                  // buttonName
			);*/
         }  
	
