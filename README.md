# Focal Point

04/19/2018
CHANGES:
* You can now Add Tasks using a makeshift Add Tasks touchable highlight on Tasks page. It takes you to a screen where you can input the task name, notes, and priority. Then the task shows up on your task list and stays there. I will leave it to Ben to customize the task addition page.

BUGS TO WATCH:
* The Until picker bug that I discussed in dev notes; if you leave an until picker on its default time, it will actually default to the zeroth element. Plz fix. Me too tired.
* We still need to re-implement the top status bar hider. Might do tomorrow.
* There is a small bug with the picker re-appearing if you’ve done like 3 or 4 runs. Probably something to do with my boolean checks.


-------------------


04/15/2018
NEW FEATURES:
* Timer is now connected to Picker. When you select a Time, async storage gives the timer that data.
* Drop-down menu can only be selected before a run or after a run. You may select a new time before you've started one, or once you complete one.
* When you navigate away from the page, the timer keeps going and remembers your time. It also remembers if you've already picked a time.

SNAGS:
* There is a slight 1-second delay between picker selection and timer display. This may be a symptom of the async fetching data.

