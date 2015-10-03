var jobtype_ids=[];
var jobtype_name=[];
var jobtype_name_push=[];
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
			window.location.hash = "#companytype_page";
		 });
	
	
	$(document).on("click","#company_type",function(){  
		jobtype_ids.length=0;
		$('#nav_panel').panel('open');
	    document.getElementById("company_type").removeAttribute("href");
		set_jobtype();
	});	
	
	$(document).on("click","#edit_jobtype",function(){  	
		$('#edit_nav_panel').panel('open');
		document.getElementById("edit_jobtype").removeAttribute("href");
		set_jobtype();
		
		
	});
	
	function set_jobtype(){
		$.ajax({
			type : "GET",
			url  :base_url+"jobtypes",
			cache: false,
			//beforeSend: function() { $.mobile.loading( 'show' ) }, //Show spinner
			//complete: function() { $.mobile.loading( 'hide' ) }, //Hide spinner
			dataType:'json',
			success:function(data)
			{
			$('#job_type_list').empty(); 
			$('#edit_job_type_list').empty(); 
			jobtype_name.length=0;
			
			$.each(data,function(i,item) {				
				var jobtype= item.jt_type;
				var id=item.Id;
				var checkid=jobtype_ids.indexOf(id.toString());
				var check=(checkid > -1)?"checked":"";
				var x=(checkid > -1)?jobtype_name.push(jobtype):"";
				$("#edit_ct_jt_id_type").val(jobtype_name);
				$("#job_type_list").append('<li id="'+item.Id+'"  jobtypename="'+item.jt_type+'"><input type="checkbox" '+check+' class="jobtypecheck" name="jobtype_ids[]" id='+item.Id+' value="'+item.jt_type+'">'+jobtype+'</li>');
				$("#job_type_list").listview().listview('refresh');	
				$("#edit_job_type_list").append('<li id="'+item.Id+'"  jobtypename="'+item.jt_type+'"><input type="checkbox" '+check+' class="jobtypecheck"  name="jobtype_ids[]" id='+item.Id+' value="'+item.jt_type+'">'+jobtype+'</li>');
				$("#edit_job_type_list").listview().listview('refresh');	
			});
		},
			error: onError
		});
	
			
	}
////***ON CLICKING CHECKBOX***////
		$(document).on('click','.jobtypecheck',function(){

		  	var id = $(this).attr('id');
			var name = $(this).val();
			
			if ($('.jobtypecheck:checked'))
			{
				var indexofid = jobtype_ids.indexOf(id);
				var indexofname = jobtype_name.indexOf(name);
				if (indexofid > -1) 
				{
					jobtype_ids.splice(indexofid,1);
					jobtype_name.splice(indexofname,1);
				}
				else{ 
			
					jobtype_ids.push(id);
					jobtype_name.push(name);
					}
			}		
		});
		$(document).on('click','#done_jobtype',function(){
		
			$("#ct_jt_id_type").val(jobtype_name);
			$('#nav_panel').panel('close');
		});

	$(document).on('click','#add_companytype_submit',function(){
		
		$('#add_companytype_form').validate({
			rules: {
				ct_type:{
					required:true
				},
				ct_jt_id_type:{
					required:true
				}
			},
			errorPlacement: function( error, element ) {
			error.insertAfter( element.parent() );
			},
			submitHandler: function (form) {
				var formdata= $('#add_companytype_form').serialize();
				formdata=formdata+"&jobtype_Id="+jobtype_ids.toString();

				 $.ajax({
						type:"GET",
						url:base_url+"companytype/create",
						cache: false,
						data:formdata,
						dataType:"json",
						success:function(data){
							if(data==1)
							{
							jobtype_ids.length=0;
							jobtype_name.length=0;
							//alert("Added Successfully");
							//refreshPage();
							//$('input').not('[type="button"]').val(''); // clear inputs except buttons, setting value to blank
							//$('#ct_jt_id_type').val('').selectmenu('refresh');
							navigator.notification.confirm("Added Successfully",addcallback, "Confirmation", "Ok");
							$.mobile.loading('show');
							function addcallback(button){
								$.mobile.loading('hide');
								if(button == 1) {
									window.location.hash = "#companytype_page";
									window.location.reload();
							      $('input').not('[type="button"]').val(''); // clear inputs except buttons, setting value to blank
							     $('#ct_jt_id_type').val('').selectmenu('refresh');
								}
							} 
						}
							
						},
						error: onError
					}); 
			}
		});//validation close
	});
	
	
	//*****ON LOADING THE JOB TYPE PAGE*****///
		$(document).on("pageinit",'#companytype_page',function(){
		
			$.ajax({
				type:"GET",
				url:base_url+"listcompanytypes",
				beforeSend: function() { $.mobile.loading( 'show' ) }, //Show spinner
				complete: function() { $.mobile.loading( 'hide' ) }, //Hide spinner
				async: "true",
				cache: false,
				dataType:"json",
				success:companytype_listview,
				error: onError
			});
		});
		
		function companytype_listview(data){
		
			$("#companytype_list").empty();
			$.each(data,function(i,item) 
			{	
			$("#companytype_list").append("<li Id="+item.Id+" data-name='ct_jt_id_type="+item.ct_jt_id_type+"="+item.ct_type+"'>"+item.ct_type+"<span data-type='horizontal' style='float:right'><a class='companytype_edit ui-btn ui-icon-edit ui-corner-all ui-btn-icon-notext ui-btn-inline' title='Edit'  href='#edit_compytype_page' data-ajax='false'>plus</a><a class='companytype_delete ui-btn ui-icon-delete ui-corner-all ui-btn-icon-notext ui-btn-inline' title='Delete'  data-ajax='false'>plus</a></span></li>");
			$("#companytype_list").listview('refresh');
			
			});			
		}
			
		////EDITING////
		$(document).on('click','.companytype_edit',function(){
	       var listitem = $( this ).parent().parent("li");
			var Id =listitem.attr('Id');
			var ct_jt_id_type =listitem.attr('data-name');
			var search=ct_jt_id_type.split('=');
			var ct_jt_id_type=search[1];
			var ct_type=search[2];
			var jobtype_check = ct_jt_id_type.split(",");
			jobtype_ids.length=0;
			jobtype_ids=jobtype_check;
			set_jobtype();
			$("#edit_Id").val(Id);
			$("#edit_ct_type").val(ct_type);
			$("#edit_jobtype_Id").val(ct_jt_id_type);
		});
		$(document).on('click','#edit_done_jobtype',function(){
			$("#edit_ct_jt_id_type").val(jobtype_name);
			$('#edit_nav_panel').panel('close');
		});
		
		
		//////DELETING//////
		$(document).on('click','.companytype_delete',function(){
			var listitem = $( this ).parent().parent("li");
				var Id =listitem.attr('Id');
				navigator.notification.confirm('Are you sure you want to delete this record?',deleteCallBack, "Confirmation", ['Yes','NO']);
					$.mobile.loading('show');
					function deleteCallBack(button){
					$.mobile.loading('hide');
					if(button == 2) {
						
					}
					else if(button == 1){
						$.ajax({
						type:"DELETE",
						url:base_url+"companytype/"+Id,
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
				} 
				
				
				/*$.alerts.okButton = ' Yes ';
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
						url:base_url+"companytype/"+Id,
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
				});*/
		});
		
		$(document).on('click','#edit_compnytype_submit',function(){
		$('#edit_companytype_form').validate({
			rules: {
				ct_type:{
					required:true
				},
				ct_jt_id_type:{
					required:true
				}
			},
			errorPlacement: function( error, element ) {
			error.insertAfter( element.parent() );
			},
			submitHandler: function (form) {
				var formdata= $('#edit_companytype_form').serialize();
					formdata=formdata+"&jobtype_Id="+jobtype_ids.toString();
					Id=$("#edit_Id").val();
					$.ajax({
						type:"PUT",
						url:base_url+"companytype/"+Id,
						cache: false,
						data:formdata,
						dataType:"json",
						success:function(data){
							
					navigator.notification.confirm("Updated Successfully",refreshPage, "Confirmation", "Ok");
					
							
						},
						error: onError
					});
			}
		});//validation close
	});
		function refreshPage(){ 
			window.location.hash = "#companytype_page";
			window.location.reload();
		}

	function onError(data, status)
         {
			navigator.notification.alert(
			'Error',  // message
			null,         // callback
			'Something went wrong:',            // title
			'Ok'                  // buttonName
			);
         }  
	
