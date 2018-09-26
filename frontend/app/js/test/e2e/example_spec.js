describe('function check' , function(){
   it('should able in correct page' , function(){
       browser.get("http://localhost:8002/");
       expect(browser.getCurrentUrl()).toContain("8002");
       expect(browser.getCurrentUrl()).toEqual("http://localhost:8002/");
   });


   it('insert correctly' , function(){
       browser.get("http://localhost:8002/");
       element(by.model("title")).sendKeys('reactjs');
       element(by.model("description")).sendKeys('javascript framework');
       element(by.model("category")).sendKeys('technical');
       element(by.buttonText("Save")).click();

       browser.sleep(5000);

       element.all(by.repeater('Emp in Emplist')).then(function(items){
           var len =items.length;

           var title = items[len-1].element(by.className('title'));
           var description = items[len-1].element(by.className('description'));
           var category = items[len-1].element(by.className('category'));

           expect(title.getText()).toEqual('reactjs');
           expect(description.getText()).toEqual('javascript framework');
           expect(category.getText()).toEqual('technical');
       });
   });

   it('update correctly' , function(){
       browser.get("http://localhost:8002/");
       element.all(by.repeater('Emp in Emplist')).then(function(items){
           var len =items.length;

           element(by.repeater('Emp in Emplist').row(len-1).column('Emp.id')).click();
           element(by.model("category")).clear().sendKeys('technology');
           element(by.buttonText("Update")).click();

           browser.sleep(5000);

           element.all(by.repeater('Emp in Emplist')).then(function(items){

               var category = items[len-1].element(by.className('category'));

               expect(category.getText()).toEqual('technology');
           });
       });
   });

   it('delete correctly' , function(){
       browser.get("http://localhost:8002/");
       element.all(by.repeater('Emp in Emplist')).then(function(items){
           var len =items.length;

           element(by.repeater('Emp in Emplist').row(len-1)).element(by.buttonText("Delete")).click();

           browser.sleep(5000);

           element.all(by.repeater('Emp in Emplist')).then(function(items){
               var newLen = items.length;

               expect(len).toEqual(newLen + 1);
           });
       });
   });
});
