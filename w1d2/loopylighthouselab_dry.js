/**************************************************************************

* problem statement

if the number is a multiple of 3, print the string "Loopy".
if the number is a multiple of 4, print the string "Lighthouse".
if the number is a multiple of 3 and 4, print the string "LoopyLighthouse".

* values
the range 100 to 200
the stings "Loopy", "Lighthouse", and "LoopyLighthouse"
the multiples 3 and 4

* expected outputs
Lighthouse
101
Loopy
103
Lighthouse
Loopy
106
107
LoopyLighthouse

* pseudo code
loop from 100 to 200:
  Let num = current step in the loop
  If num % 3 is equal to 0:
    print "Loopy"
  If num % 4 is equal to 0:
    print "Lighthouse"
  If num % 3 is equal to 0 and If num % 4 is equal to 0:
    print "LoopyLighthouse"
  Otherwise 
    print num
  End If
end loop
****************************************************************************/
for(var n = 100; n <= 200; n++){
  var result = "";
  if(n % 3 === 0){
    result += "Loopy";
  }
  if(n % 4 === 0){
    result += "Lighthouse";
  }

  console.log(result || n);
}