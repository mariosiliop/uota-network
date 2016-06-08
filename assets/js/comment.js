function comment(cid) {

   console.log(cid + " comment id");

   $.ajax({
      url: '/comment/addview',
      type: 'post',
      data: {cid: cid}
   });

   $('#ela').remove();
   var main_div = $('<div>').css({'width':'50%',
                               'position':'relative',
                               'padding-left':'15%',
                               'float':'left',
                               'text-align':'left',
                               'top': '5%'
                              })
   .attr('id', 'ela');

   $.ajax({
      url: '/comment/timeline',
      type: 'post',
      data: {cid: cid},
      success: (results)=> {
         console.log(results);

         var file_info = $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                  'position':'relative',
                                  'font-size':'14px',
                                  'padding-top':'7px',
                                  'font-weight': '900',
                                  'text-align': 'center',
                                  'width':'180px'
                               }).html('File Info').attr('id', 'label');

         var br= $('<br>');

         var br5= $('<br>');

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
                                .attr({'type':'text', 'value': results[0].title})
         .prop("readonly", true);
         var title= $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                   'position':'relative',
                                   'font-size':'14px',
                                   'padding-top':'7px',
                                   'font-weight': '900'
                                   }).html('Title').attr('id', 'label');

           var text2 = $('<input>').css({'display': 'block',
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
                                  .attr({'type':'text', 'value': results[0].author})
           .prop("readonly", true);
           var author = $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                     'position':'relative',
                                     'font-size':'14px',
                                     'padding-top':'7px',
                                     'font-weight': '900'
                                  }).html('Author').attr('id', 'label');

             var text3 = $('<a>').css({'display': 'block',
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
                                    .attr({
                                       'href': 'profile-photos/'+results[0].file,
                                       'type': results[0].type,
                                       'rel': 'nofollow'
                                    })
                                    .html(results[0].original);

             var pdf = $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                       'position':'relative',
                                       'font-size':'14px',
                                       'padding-top':'7px',
                                       'font-weight': '900'
                                    }).html('PDF/URL').attr('id', 'label');

               var text4 = $('<input>').css({'display': 'block',
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
                                      .attr({'type':'text', 'value': results[0].date.split('T')[0]})
               .prop("readonly", true);
               var date = $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                         'position':'relative',
                                         'font-size':'14px',
                                         'padding-top':'7px',
                                         'font-weight': '900'
                                      }).html('Date').attr('id', 'label');

              var text5 = $('<input>').css({'display': 'block',
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
                                    .attr({'type':'text', 'value': results[0].description})
              .prop("readonly", true);
              var desc = $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                       'position':'relative',
                                       'font-size':'14px',
                                       'padding-top':'7px',
                                       'font-weight': '900'
                                    }).html('Description').attr('id', 'label');

               var text6 = $('<input>').css({'display': 'block',
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
                                     .attr({'type':'text', 'value': results[0].category})
               .prop("readonly", true);
               var category = $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                        'position':'relative',
                                        'font-size':'14px',
                                        'padding-top':'7px',
                                        'font-weight': '900'
                                     }).html('Category').attr('id', 'label');

               var br1= $('<br>');
               var br2= $('<br>');
               var br3= $('<br>');
               var br4= $('<br>');

               var scores = $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                        'position':'relative',
                                        'font-size':'14px',
                                        'padding-top':'7px',
                                        'font-weight': '900',
                                        'text-align':'center',
                                        'width':'180px'
                                     }).html('File Scores').attr('id', 'label');


             var br6= $('<br>');
             var br7= $('<br>');
             var br8= $('<br>');


               var text7 = $('<input>').css({'display': 'block',
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
                                   .attr({'type':'text', 'value': results[0].score})
               .prop("readonly", true);

               var total_score = $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                      'position':'relative',
                                      'font-size':'14px',
                                      'padding-top':'7px',
                                      'font-weight': '900'
                                   }).html('Total Score').attr('id', 'label');

               var text8 = $('<input>').css({'display': 'block',
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
                                    .attr({'type':'text', 'value': results[0].views})
               .prop("readonly", true);
               var views = $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                       'position':'relative',
                                       'font-size':'14px',
                                       'padding-top':'7px',
                                       'font-weight': '900'
                                    }).html('Views').attr('id', 'label');

         $(main_div).append(file_info);
         $(main_div).append(br);
         $(main_div).append(br5);

         $(main_div).append(title);
         $(main_div).append(text1);

         $(main_div).append(author);
         $(main_div).append(text2);

         $(main_div).append(pdf);
         $(main_div).append(text3);

         $(main_div).append(date);
         $(main_div).append(text4);

         $(main_div).append(desc);
         $(main_div).append(text5);

         $(main_div).append(category);
         $(main_div).append(text6);

         $(main_div).append(br1);
         $(main_div).append(br2);
         $(main_div).append(br3);
         $(main_div).append(br4);

         $(main_div).append(scores);

         $(main_div).append(br6);
         $(main_div).append(br7);
         $(main_div).append(br8);

         $(main_div).append(total_score);
         $(main_div).append(text7);

         $(main_div).append(views);
         $(main_div).append(text8);



         var div1= $('<div>').css({
                   'position': 'relative',
                   'min-height':' 15px'
               })
               .addClass('col-md-4');

      var br9= $('<br>');

      var br10= $('<br>');

      var rate = $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                              'position':'relative',
                              'font-size':'14px',
                              'padding-top':'7px',
                              'font-weight': '900'
                           }).html('Rate the Document (5 is the best)').attr('id', 'label');

      var br11= $('<br>');

      var br12= $('<br>');



      var question1 = $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                              'position':'relative',
                              'font-size':'14px',
                              'padding-top':'7px',
                              'font-weight': '900'
                           }).html('Is the document clear?').attr('id', 'label');

         var select= $('<select>').addClass('form-control')
                                 .css({
                                     'width':'50%',
                                 })
                                 .attr('value', '');


        var text9=$('<input>').css({'display': 'block',
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

           var option1= $('<option>').html('1')
                                       .attr('value', '1');

           var option2= $('<option>').html('2')
                                       .attr('value','2');

           var option3= $('<option>').html('3')
                                       .attr('value','3');

           var option4= $('<option>').html('4')
                                       .attr('value','4');

           var option5= $('<option>').html('5')
                                       .attr('value','5');






            var question2 = $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                    'position':'relative',
                                    'font-size':'14px',
                                    'padding-top':'7px',
                                    'font-weight': '900'
                                 }).html('Is the document notable?').attr('id', 'label');

               var select2= $('<select>').addClass('form-control')
                                       .css({
                                           'width':'50%',
                                       })
                                       .attr('value', '');


              var text10=$('<input>').css({'display': 'block',
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

                 var option1_2= $('<option>').html('1')
                                             .attr('value', '1');

                 var option2_2= $('<option>').html('2')
                                             .attr('value','2');

                 var option3_2= $('<option>').html('3')
                                             .attr('value','3');

                 var option4_2= $('<option>').html('4')
                                             .attr('value','4');

                 var option5_2= $('<option>').html('5')
                                             .attr('value','5');







                  var question3 = $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                          'position':'relative',
                                          'font-size':'14px',
                                          'padding-top':'7px',
                                          'font-weight': '900'
                                       }).html('Is the document contiguous?').attr('id', 'label');

                     var select3= $('<select>').addClass('form-control')
                                             .css({
                                                 'width':'50%',
                                             })
                                             .attr('value', '');


                    var text11=$('<input>').css({'display': 'block',
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

                       var option1_3= $('<option>').html('1')
                                                   .attr('value', '1');

                       var option2_3= $('<option>').html('2')
                                                   .attr('value','2');

                       var option3_3= $('<option>').html('3')
                                                   .attr('value','3');

                       var option4_3= $('<option>').html('4')
                                                   .attr('value','4');

                       var option5_3= $('<option>').html('5')
                                                   .attr('value','5');






                     var question4 = $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                             'position':'relative',
                                             'font-size':'14px',
                                             'padding-top':'7px',
                                             'font-weight': '900'
                                          }).html('Do you agree with its index?').attr('id', 'label');

                        var select4= $('<select>').addClass('form-control')
                                                .css({
                                                    'width':'50%',
                                                })
                                                .attr('value', '');


                       var text12=$('<input>').css({'display': 'block',
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

                          var option1_4= $('<option>').html('1')
                                                      .attr('value', '1');

                          var option2_4= $('<option>').html('2')
                                                      .attr('value','2');

                          var option3_4= $('<option>').html('3')
                                                      .attr('value','3');

                          var option4_4= $('<option>').html('4')
                                                      .attr('value','4');

                          var option5_4= $('<option>').html('5')
                                                      .attr('value','5');



                        var submit= $('<button>').html('Submit').addClass('btn-primary btn').css({
                            'width':'25%',
                            'display':'table-cell',
                            'margin':'10px'
                        }).click(function(){

                              console.log(select.val() + ' ' + select2.val() + ' ' + select3.val() + ' ' + select4.val());
                              $.ajax({
                                 url: '/comment/rate',
                                 type: 'post',
                                 data: {cid: cid, rate1: parseInt(select.val()), rate2: parseInt(select2.val()), rate3: parseInt(select3.val()), rate4: parseInt(select4.val()) },
                                 success: () => {
                                    console.log('geiaa');
                                    window.location.href = 'home';
                                 }
                              });

                        });


        $(div1).append(br9);
        $(div1).append(br10);

        $(div1).append(rate);

        $(div1).append(br11);
        $(div1).append(br12);

        $(div1).append(question1);
        $(select).append(option1);
        $(select).append(option2);
        $(select).append(option3);
        $(select).append(option4);
        $(select).append(option5);
        $(text9).append(select);
        $(div1).append(select);


        $(div1).append(question2);
        $(select2).append(option1_2);
        $(select2).append(option2_2);
        $(select2).append(option3_2);
        $(select2).append(option4_2);
        $(select2).append(option5_2);
        $(text10).append(select2);
        $(div1).append(select2);

        $(div1).append(question3);
        $(select3).append(option1_3);
        $(select3).append(option2_3);
        $(select3).append(option3_3);
        $(select3).append(option4_3);
        $(select3).append(option5_3);
        $(text11).append(select3);
        $(div1).append(select3);

        $(div1).append(question4);
        $(select4).append(option1_4);
        $(select4).append(option2_4);
        $(select4).append(option3_4);
        $(select4).append(option4_4);
        $(select4).append(option5_4);
        $(text12).append(select4);
        $(div1).append(select4);
        $(div1).append(submit);

        $(div1).append('<br>');
        $(div1).append('<br>');



        var div2= $('<div>').css({
                  'position': 'relative',
                  'min-height':' 15px'
              })
              .addClass('col-md-4 scroll');

        $(div1).append(div2);

        $.ajax({
           url: '/comment/view',
           type: 'post',
           dataType:'Json',
           data : {cid: cid},
           success: (data) => {

                   for (let x of data) {

                      console.log(x.comment);

                      var from_user = $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                                'position':'relative',
                                                'font-size':'14px',
                                                'padding-top':'7px',
                                                'font-weight': '900'
                                             }).html(x.user).attr('id', 'label');

                        var comment= $('<textarea>').css({'display': 'block',
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
                         }).val(x.comment)
                       .prop("readonly", true);



                       $(div2).append(from_user);
                       $(div2).append(comment);

                 }
           }
        });



         var sxolio = $('<label>').css({'font-family':'brandon-grotesque",sans-serif',
                                   'position':'relative',
                                   'font-size':'14px',
                                   'padding-top':'7px',
                                   'font-weight': '900'
                                }).html('Add your comment').attr('id', 'label');

           var comment= $('<textarea>').css({'display': 'block',
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

         var comm= $('<button>').html('Submit').addClass('btn-primary btn').css({
             'width':'25%',
             'display':'table-cell',
             'margin':'10px'
         }).click(function(){

               console.log(comment.val());
               $.ajax({
                  url: '/comment/child',
                  type: 'post',
                  data: {cid: cid, comment: comment.val()},
                  success: () => {
                     window.location.href = 'home';
                  }
               });

         });




         $(div1).append('<br>');
         $(div1).append('<br>');
         $(div1).append('<br>');
         $(div1).append('<br>');

         $(div1).append(sxolio);
         $(div1).append('<br>');

         $(div1).append(comment);
         $(div1).append('<br>');
         $(div1).append(comm);

         $('body').append(main_div);
         $('body').append(div1);

      }
   });

}
