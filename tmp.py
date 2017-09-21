import base64
with open("img1.png", "rb") as imageFile:
	str = base64.b64encode(imageFile.read())
	print(str)
