var fs = require('fs');
var path = require('path');

var data = `1019,Sushi Restaurant
1029,Food Menu boards
1007,Home and Garden
1009,Hotel Lobby
1016,Coffee Shop
1011,Hobby Shop
1013,Sports Bar
1014,Museum
1017,Bank
1018,Gas Station
1020,Casino
1000,Travel
1021,Bicycle Shop
1022,Tanning Salon
1023,Pharmacy
1024,Laser Away
1025,Dentistry
1026,Clothing store
1027,Golf club
1028,RC Helis
1030,7 Eleven
1031,Subway
1032,Super Market
1033,Investment Group
1035,Synagogue
1036,Dry Cleaning
1037,Ice Cream Shop
1038,Real Estate office
1039,Night Club
1040,Hockey
1041,Train Station
1042,Realtor
1043,Toy Store
1044,Indian Restaurant
1045,Library
1046,Movie Theater
1047,Airport
1048,LAX
100310,Motel
100301,Parks and Recreations
100322,Corner Bakery
100331,Retirement home
100368,Navy recruiting office
100397,Martial arts school
100414,Supercuts
100432,The UPS Store
100438,Cruise One
100483,Car services
100503,fedex kinkos
100510,veterinarian
100556,YMCA
100574,Tax services
100589,Wedding planner
100590,Cleaning services
100620,Pet Training
100661,Gymboree Kids
100677,Trader Joes
100695,Men Haircuts
100722,Jiffy Lube
100738,Toyota  car dealer
100747,Winery
100771,Savings and Loans
100805,Nail Salon
100822,Weight Watchers
100899,Dollar Tree
100938,Western Bagles
100959,Kaiser Permanente
300143,Funeral home
205734,Church
220354,College
206782,Dr. Waiting Room
300769,NFL Stadium
301814,University Campus
303038,Day care
304430,GameStop
307713,Del Taco
305333,General Hospital
305206,Starbucks
308283,training and fitness
311519,High school K12 hall
309365,Winery
310879,Law Firm
1001,Health Club
1002,Gym
1003,Flower Shop
1004,Car Dealership
1012,Pet Shop
1005,Hair Salon
1209,Motorcycle shop
1210,Sushi and Grill
1211,Coffee Shop
1212,Pizzeria
1213,Music Store
1214,Diner
1215,Hair Salon
1216,Dentist
1203,Jewelry
1217,Crossfit
1218,Copy and Print shop
1219,Antique Store
1220,Watch and Clock Repair Store
1221,Mediterranean Cuisine
1222,Toy Store
1223,Pet Store and Grooming
1224,Veterinarian
1225,Tattoo Parlor
1226,Camera Store
1228,Bike shop
1229,Gun Shop
1230,Chiropractic Clinic
1231,French Restaurant
1233,Winery
1232,Mexican Taqueria
1234,Bistro Restaurant
1235,Vitamin Shop
1227,Tailor Shop
1236,Computer Repair
1237,Car Detail
1238,Asian Restaurants
1239,Marijuana Dispensary
1240,Church
1241,Synagogue
1242,Frozen Yogurt Store
1244,Baby Day Care
1052,Car wash
1053,Smoke shop
1054,Yoga place
1055,Laundromat
1056,Baby clothes
1057,Travel agency
1058,Real Estate agent`;

var arr = data.split('\n');
for (var i = 0 ; i < arr.length; i++) {
    var found = false;
    var line = arr[i].split(',');
    var busID = line[0];
    var name = (line[1]).toLowerCase();
    name = name.replace(/ /ig,'');
    //console.log('working on ' + name + ' ' + busID);

    var files = fs.readdirSync('c:/Users/root.DESKTOP-70Q3AQH/Desktop/samples');
    for (var a = 0; a < files.length; a++){
        //console.log(path.extname(files[a]));
        if(path.extname(files[a]) === ".webm"){
            var fileName = (files[a]).toLowerCase();
            fileName = fileName.replace(/\.webm/ig,'');
            fileName = fileName.replace(/[0-9]/ig,'');
            fileName = fileName.replace(/ /ig,'');
            fileName = fileName.replace(/_/ig,'');
            fileName = fileName.replace(/-/ig,'');
            if (name == fileName){
                found = true;
                //console.log('matching name:' + name + ' name:' + fileName + ' id:' + busID + ' file:' + files[a] + ' ' + path.extname(files[a]));
            }
        }
    }
    if (found == false){
        console.log('did not find ' + name);
    }
}