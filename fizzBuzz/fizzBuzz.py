# Fizzbuzz
# Gavin Su
# http://gavin.su

def method1():
  for x in range(1,101):
    if x % 3 == 0 and x % 5 == 0:
        print("FizzBuzz")
    elif x % 3 == 0:
        print("Fizz")
    elif x % 5 == 0:
        print("Buzz")
    else:
        print(x)
        
def method2():
  for x in range(1,101):
    c = ""
    if x % 3 == 0:
        c += "Fizz"
    if x % 5 == 0:
        c += "Buzz"
    if c == "":
        c = x
    print(c)
    
method1()
