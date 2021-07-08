# ShuffleSpace

The management wants to develop and implement a module where all warehouse employees will have
to scan a QR code associated with a customer project, each time they work on a customer request.
Ex: Customer A opens 2 requests:
R1: move all my equipment from Warehouse to Montreal HQ – Bill project “MTL”
R2: return all my equipment to the Warehouse from Alberta – bill project “ALBERTA”
Warehouse worker on R1: scans the QR code associated with Customer A, Project MTL and starts
working. Billable time gets associated with the R1 request, customer and project defined
When work is done, a new scan of the QR will complete the task at hand associated with the
Customer/Project pair

1) Write the Software Architecture Document for this new model (data, logic and presentation layer) –
not extensive
2) Implement a module using NodeJS/Mongodb that has:
a. 2 warehouse users (user login is not in the scope – you can use hardcoded username/pass)
b. 2 customers with 2 projects each
c. Each customer project has its own QR
d. Warehouse user logs in then:
i. selects a customer project
ii. QR gets displayed
iii. QR code scanned will start a timer (Start work on Project)
iv. QR code scanned again, will stop timer (Start work on Project)
e. Display total (fictious but working ) hours worked on all customer projects by all warehouse
users
3) Provide working code with installation/deployment documentation for testing
