function process(pid) {

    $('#feuga').remove();
    $('#mySearch').remove();
    console.log(pid);
    $.ajax({
        url: '/post/comments',
        data: {pid: pid},
        dataType: 'Json',
        type: 'post',
        success: (data) => {

            console.log(data);
            var front = $('<div>').css({'width':'50%',
                                        'position':'relative',
                                        'padding-left':'15%',
                                        'float':'left',
                                        'text-align':'left'
                                       })
            .attr('id', 'content');
            var br= $('<br>');
            var text1=$('<input>').css({'display': 'block',
                                        'width': '50%',
                                        'height': '34px',
                                        'padding': '6px 12px',
                                        'font-size': '14px',
                                        'line-height': '1.42857143',
                                        'color': '#555',
                                        'background-color': '#fff',
                                        'background-image': 'none',
                                        'border': '1px solid #ccc',
                                        'border-radius': '4px',
                                        '-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075)',
                                        'box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075)',
                                        '-webkit-transition': 'border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s',
                                        '-o-transition': 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
                                        'transition': 'border-color ease-in-out'
                                    })
                                   .attr({'type':'text', 'value': data[0].title})
            .prop("readonly", true);
            var title= $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                      'position':'relative',
                                      'font-size':'14px',
                                      'padding-top':'7px',
                                      'font-weight': '900'
                                      }).html('Title').attr('id', 'label');
             var who= $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                      'position':'relative',
                                      'font-size':'14px',
                                      'padding-top':'9px',
                                      'font-weight': '900'}).html('Who started the process');

       var text2=$('<input>').css({'display': 'block',
                               'width': '50%',
                               'height': '34px',
                               'padding': '6px 12px',
                               'font-size': '14px',
                               'line-height': '1.42857143',
                               'color': '#555',
                               'background-color': '#fff',
                               'background-image': 'none',
                               'border': '1px solid #ccc',
                               'border-radius': '4px',
                               '-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075)',
                               'box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075)',
                               '-webkit-transition': 'border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s',
                               '-o-transition': 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
                               'transition': 'border-color ease-in-out'
                            })
                            .attr({'type':'text', 'value': data[0].username})
                            .prop("readonly", true);

     var add= $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                'position':'relative',
                                'font-size':'14px',
                                'padding-top':'9px',
                                'font-weight': '900'
                             })
                             .html('Add your PDF or URL document');

     var text3=$('<input>').css({'display': 'block',
                               'width': '50%',
                               'height': '34px',
                               'padding': '6px 12px',
                               'font-size': '14px',
                               'line-height': '1.42857143',
                               'color': '#555',
                               'background-color': '#fff',
                               'background-image': 'none',
                               'border': '1px solid #ccc',
                               'border-radius': '4px',
                               '-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075)',
                               'box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075)',
                               '-webkit-transition': 'border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s',
                               '-o-transition': 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
                               'transition': 'border-color ease-in-out'
                           })
                           .attr('type', 'file') ;

    var author= $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                   'position':'relative',
                                   'font-size':'14px',
                                   'padding-top':'7px',
                                   'font-weight': '900'
                                })
                                .html('Author')
                                .attr('id', 'label');

    var text4= $('<input>').css({'display': 'block',
    'width': '50%',
    'height': '34px',
    'padding': '6px 12px',
    'font-size': '14px',
    'line-height': '1.42857143',
    'color': '#555',
    'background-color': '#fff',
    'background-image': 'none',
    'border': '1px solid #ccc',
    'border-radius': '4px',
    '-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075)',
    'box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075)',
    '-webkit-transition': 'border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s',
    '-o-transition': 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
    'transition': 'border-color ease-in-out'})
                                       .attr('type', 'text') ;
     var published= $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                      'position':'relative',
                                      'font-size':'14px',
                                      'padding-top':'7px',
                                      'font-weight': '900'
                                      }).html('Published on').attr('id', 'label');
    var date= $('<input>').css({'display': 'block',
    'width': '50%',
    'height': '34px',
    'padding': '6px 12px',
    'font-size': '14px',
    'line-height': '1.42857143',
    'color': '#555',
    'background-color': '#fff',
    'background-image': 'none',
    'border': '1px solid #ccc',
    'border-radius': '4px',
    '-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075)',
    'box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075)',
    '-webkit-transition': 'border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s',
    '-o-transition': 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
    'transition': 'border-color ease-in-out'})
                                       .attr('type', 'date') ;

      var description= $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                      'position':'relative',
                                      'font-size':'14px',
                                      'padding-top':'7px',
                                      'font-weight': '900'
                                      }).html('Description').attr('id', 'label');

  var descr= $('<textarea>').css({'display': 'block',
    'width': '50%',
    'height': '34px',
    'padding': '6px 12px',
    'font-size': '14px',
    'line-height': '1.42857143',
    'color': '#555',
    'background-color': '#fff',
    'background-image':'none',
    'border': '1px solid #ccc',
    'border-radius': '4px',
    'transition': 'border-color ease-in-out'
    }).attr('id','descrption');

   var category= $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                      'position':'relative',
                                      'font-size':'14px',
                                      'padding-top':'7px',
                                      'font-weight': '900'
                                      }).html('Category').attr('id', 'label');


   //  var options= $('<div>').addClass('ui-select');
    var select= $('<select>').addClass('form-control')
                            .css({
                                'width':'50%',
                            })
                            .attr('value', '');


            var text6=$('<input>').css({'display': 'block',
                                        'width': '50%',
                                        'height': '34px',
                                        'padding': '6px 12px',
                                        'font-size': '14px',
                                        'line-height': '1.42857143',
                                        'color': '#555',
                                        'background-color': '#fff',
                                        'background-image': 'none',
                                        'border': '1px solid #ccc',
                                        'border-radius': '4px',
                                        '-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075)',
                                        'box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075)',
                                        '-webkit-transition': 'border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s',
                                        '-o-transition': 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
                                        'transition': 'border-color ease-in-out'
                                    });
            var title2= $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                      'position':'relative',
                                      'font-size':'14px',
                                      'padding-top':'7px',
                                      'font-weight': '900'
                                      }).html('Title').attr('id', 'label');



             var option1= $('<option>').html('Scientific Article')
                                         .attr('value', 'Scientific Article');

             var option2= $('<option>').html('Public Authority')
                                         .attr('value','Public Authority');

             var option3= $('<option>').html('Company form')
                                         .attr('value','Company form');

             var option4= $('<option>').html('Personal opinion/blog')
                                         .attr('value','Personal opinion/blog');

             var option5= $('<option>').html('Other')
                                         .attr('value','Other');

             var create= $('<button>').html('Create').css({
                 'width':'25%',
                 'display':'table-cell'
             }).addClass('btn-primary btn').click(
             function(){
                 var formdata = new FormData();

                 if(text3[0].files[0]){
                     formdata.append('pid', pid);
                     formdata.append('title', text6.val());
                     formdata.append('pdf', text3[0].files[0]);
                     formdata.append('author',text4.val());
                     formdata.append('date',date.val());
                     formdata.append('desc',descr.val());
                     formdata.append('category',select.val());

                     var xhr=new XMLHttpRequest();
                     xhr.open('post','http://marios.zenarena.com:8080/comment/add');
                     xhr.send(formdata);
                     xhr.onload=function(){
                         window.location.href='home';
                     };
                 }
             }
             );
             var cancel= $('<button>').html('Cancel').addClass('btn-primary btn').css({
                 'width':'25%',
                 'display':'table-cell',
                 'margin':'10px'
             }).click(function(){
                         window.location.href='home';
                     });
             var br1= $('<br>');
             var br2= $('<br>');
             var br3= $('<br>');
             var br4= $('<br>');
             var br5= $('<br>');


              $(front).append(title);
              $(front).append(text1);
              $(front).append(who);
              $(front).append(text2);
              $(front).append(br2);
              $(front).append(br3);
              $(front).append(br5);
              $(front).append(title2);
              $(front).append(text6);
              $(front).append(add);
              $(front).append(text3);
              $(front).append(author);
              $(front).append(text4);
              $(front).append(published);
              $(front).append(date);
              $(front).append(description);
              $(front).append(descr);
              $(front).append(category);
              $(front).append(select);
              $(select).append(option1);
              $(select).append(option2);
              $(select).append(option3);
              $(select).append(option4);
              $(select).append(option5);
              $(front).append(br1);
              $(front).append(br4);
              $(front).append(create);
              $(front).append(cancel);
              $('#ela').append(front);


             $.ajax({
                url: '/post/comment',
                type: 'post',
                data: {pid: pid},
                success: (results) => {
                   console.log(results);

                  var section= $('<section>').attr('id' , 'cd-timeline')
                                               .css({
                                                 'left': '15%',
                                                 'padding-top': '60px'
                                              });

                 var div1= $('<div>').css({
                           'position': 'relative',
                           'min-height':' 15px'
                       })
                       .addClass('col-md-5');

                   for(let x of results){



                       var div2 = $('<div>').addClass('cd-timeline-block');
                       var div3 = $('<div>').addClass('cd-timeline-img cd-picture')
                                              .html(new Date(x.date).getMonth()+1 + '/' + new Date(x.date).getDate() + '/' + new Date(x.date).getFullYear());

                        var div4 = $('<div>').addClass('cd-timeline-content')
                                             .css({
                                                'margin-top': '0px',
                                                'padding': '5px',
                                                'margin': '-20px'
                                             });

                        var comm_title = $('<h2>').html(x.title);
                        var comm_desc = $('<p>').html(x.description);

                        var comm_button = $('<button>').addClass('cd-read-more')
                                                         .html('Read More')
                                                         .click( () => {
                                                            comment(x.cid);
                                                         });

                        $(div4).append(comm_title);
                        $(div4).append(comm_desc);
                        $(div4).append(comm_button);


                        $(div2).append(div3);
                        $(div2).append(div4);
                        $(section).append(div2);


                   }

                   $(div1).append(section);
                   $('#ela').append(div1);


                }

             });

       }
    });

}
