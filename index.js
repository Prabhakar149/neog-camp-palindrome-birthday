const myBirthday = document.querySelector("#birthday");
const myButton = document .querySelector(".myBtn");
const message = document.querySelector("#output");


function reverseString(str){
    var charOfStr = str.split("");
    var reversedChar = charOfStr.reverse();
    var reversedStr = reversedChar.join("");
    return reversedStr;
}

function isPalindrome(str){
    var reversedStr = reverseString(str);
    if(reversedStr === str){
        return true;
    }
    return false;
}

function getDateAsString(date){
    var strDate = {
        day: "",
        month: "",
        year: ""
    }
    if(date.day<10){
        strDate.day = "0"+date.day;
    }else{
        strDate.day = date.day.toString();
    }

    if(date.month<10){
        strDate.month = "0"+date.month;
    }else{
        strDate.month = date.month.toString();
    }

    strDate.year =  date.year.toString();

    var ddmmyyyyString = strDate.day + strDate.month + strDate.year;
    return ddmmyyyyString;
    
}

function isLeapYear(year){
    if(year % 4 === 0){
        if(year % 100 === 0){
            if(year % 400 === 0){
                return true;
            }else{
                return false;
            }     
        }
        return true;
    }
    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }else{
        if(day > monthDays[month-1]){
            day = 1;
            month++;
        }
    }

    if(month > 12){
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    }
}

function getNextPalindromeDate(date){
    var nextDate = getNextDate(date);
    var count = 0;

    while(true){
        count++;
        var stringDate = getDateAsString(nextDate);
        if(isPalindrome(stringDate)){
            return [count,nextDate];
        }
        nextDate = getNextDate(nextDate);
    }
}

function getPreviousDate(date){
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(day === 0){
        month--;

        if(month === 0){
            month = 12;
            day = 31;
            year--;
        }
        else if(month === 2){
            if(isLeapYear(year)){
                day = 29;
            }else{
                day = 28;
            }
        }else{
            day = monthDays[month-1];
        }
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getPreviousPalindromeDate(date){
    var previousDate = getPreviousDate(date);
    var count = 0;

    while(true){
        count++;
        var stringDate = getDateAsString(previousDate);
        if(isPalindrome(stringDate)){
            return [count,previousDate];
        }
        previousDate = getPreviousDate(previousDate);
    }
}


function palindromeHandler(){
    var birthdayStr = myBirthday.value;
    if(birthdayStr !== ""){
        var myDate = birthdayStr.split("-");
        var date ={
            day: Number(myDate[2]),
            month: Number(myDate[1]),
            year: Number(myDate[0])
        }
        var dateString = getDateAsString(date);
        if(isPalindrome(dateString)){
            message.innerText = "Yes, your birthday is palindrome";
        }else{
            var [count1, nextPalindromeDate] = getNextPalindromeDate(date);
            var [count2, previousPalindromeDate] = getPreviousPalindromeDate(date);
            
            if(nextPalindromeDate.day<10){
                nextPalindromeDate.day = "0"+nextPalindromeDate.day;
            }
            if(nextPalindromeDate.month<10){
                nextPalindromeDate.month = "0"+nextPalindromeDate.month;
            }
            if(previousPalindromeDate.day<10){
                previousPalindromeDate.day = "0"+previousPalindromeDate.day;
            }
            if(previousPalindromeDate.month<10){
                previousPalindromeDate.month = "0"+previousPalindromeDate.month;
            }

            if(count1 < count2){
                message.innerText = `The nearest palindrome date is ${nextPalindromeDate.day}-${nextPalindromeDate.month}-${nextPalindromeDate.year}, you missed by ${count1} days`;
            }else{
                message.innerText = `The nearest palindrome date is ${previousPalindromeDate.day}-${previousPalindromeDate.month}-${previousPalindromeDate.year}, you missed by ${count2} days`;
            }
        }
    }
    else{
        message.innerText = "Please give any date";
    }
}


myButton.addEventListener("click", palindromeHandler);
