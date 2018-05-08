#pylint:disable=W0312

running = True

calDaysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

weekDays = ["Su","M ","Tu","W ","Th","F ","Sa"]

monthStarts = [4,0,0,3,5,1,3,6,2,4,0,2]

events = []


month = [None]*42

print "\n Type the number of the month ex: 1-12 followed by a space then the year. \n Type add followed by the date ex. 4/14/2018 followed by the event name to add an event.\n Type c then the date in the same format to check the description for that date. A date with an event will appear with an asterisk next to the date in calander view."

def displayMonth(mon, name, monVal, year, startDay, monLength):
	print " " * 6 + name + " " + str(year)
	wklist = "  "
	for wkday in weekDays:
		wklist+=wkday+ "  "
	print wklist
		
	for y in range(0,6):
		row = ""
		for z in range(0,7):
			space = "  "
			for event in events:
				if ((y*7+z) > startDay and (y*7+z) < startDay + monLength and event['year'] == str(year) and event['month'] == str(monVal+1) and event['day'] == str(mon[y*7+z])):
					space = " *"
				else:
					space= "  " 
			row += space + str(mon[y*7+z])
			if(len(str(mon[y*7+z])) ==1):
				row += " "
		print row


def countLeapYears(year):
	return int(round((float(year)-1970)/4))
	
def getMonLength(monVal, year):
	monthLen = calDaysInMonths[monVal]
	if (monVal == 1 and year%4 == 0):
		monthLen = 29
	return monthLen
	
	
def popArray(monVal, year):
	startDay = monthStarts[monVal] #4
	offset = ((year-1970))
	#print offset
	offset+=countLeapYears(year)
	#print offset
	#print offset%7
	startDay+= offset
	startDay = startDay%7
	#print startDay
	monthLen = getMonLength(monVal, year)
	monName = monthNames[monVal]
	if monVal == 0:
		prevMonthLen = getMonLength(monVal, year - 1)
	else:
		prevMonthLen = getMonLength((monVal-1)%12, year)
			
	#print startDay
	
	for x in range(startDay, startDay+monthLen):
		month[x] = (x-startDay)+1
		#print x
	
	for x in range(monthLen+startDay, 42):
		month[x] = (x-(monthLen+startDay))+1
	i = 0
	while(month[i] == None):
		month[i] = prevMonthLen-startDay+i+1
		i+=1
		
	displayMonth(month, monName, monVal, year, startDay, monthLen)
	
while(running):
	usrInput = str(raw_input()).split(" ")
	if(usrInput[0] == "quit"):
		break
	elif usrInput[0] == "add":
		date = usrInput[1].split("/")
		desc = []
		for item in range(2, len(usrInput)):
			desc.append(usrInput[item])
		events.append({
		'day': date[1],
		'month': date[0],
		'year': date[2],
		'desc': ' '.join(desc)
		})
		print events
	elif (usrInput[0] == "c"):
		date = usrInput[1]
		for ev in events:
			if (ev["month"] + "/" + ev["day"] + "/" + ev["year"]) == date:
				print ev["desc"]
		
	else:
		popArray(int(usrInput[0])-1, int(usrInput[1]))
	month = [None]*42
