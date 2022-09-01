from django.shortcuts import render

# Create your views here.
def calc(request):
    context={}
    return render(request,'calc/calc.html',context)
