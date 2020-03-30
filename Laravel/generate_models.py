import os

dir = os.path.dirname(os.path.realpath(__file__))

modelNames = ["member_link","project", "sprint", "ticket_user", "file", "column", "ticket", "comment"]

for model in modelNames:
	str = "php artisan make:migration {model} --create={table}".format(model=model, table=model)
	os.system(str)
	print str
