from flask import Flask, render_template, request, json, jsonify
import eportal
import uuid
app = Flask(__name__)



@app.route('/')
def index_page():
  return render_template("index.html")

def login_data(ac,eportaldata):
  with open("static/data/amount.json") as file:
    data = json.load(file)
  if ac in data["accounts"]:
    data["accounts"][ac]["login_time"]+=1
  else:
    data["accounts"][ac] = {
      "basic":{
        "id":eportaldata["id"],
        "clicks":0,
        "name":eportaldata["name"],
        "class":eportaldata["class"]
      },
      "login_time":1,
      "passcode":""
    }
  passcode = uuid.uuid4()
  data["accounts"][ac]["passcode"] = passcode
  with open("static/data/amount.json", "w") as file:
    json.dump(data, file)
  return passcode
    

@app.route('/eportal',methods=["POST"])
def checkacpw():
  ac = request.form.get("account")
  pw = request.form.get("password")
  eportaldata = eportal.check_eportal(ac,pw)
  
  if eportaldata["res"]:
    
    return jsonify({"message":"true","passcode":login_data(ac,eportaldata),"name":eportaldata["name "]})
  else:  
    return jsonify({"message":"false"})

def check_passcode(ac,passcode):
  print(ac)
  if ac == "":
    return False
  
  with open("static/data/amount.json") as file:
    data = json.load(file)
  if data["accounts"][ac]["passcode"] == passcode:
    return True
  else:
    return False

def getnowdata():
  with open("static/data/amount.json") as file:
    data = json.load(file)
  output = {"accounts":[]}
  for i in data["accounts"]:
    output["accounts"].append(data["accounts"][i]["basic"])
  return output
def uploadClick(ac,clicks):
  with open("static/data/amount.json") as file:
    data = json.load(file)
  data["accounts"][ac]["basic"]["clicks"] += int(clicks)
  with open("static/data/amount.json","w") as file:
    json.dump(data, file)


@app.route('/upload',methods=['POST'])
def upload():
  ac = request.form.get("account")
  if ac == "":#no login
    nowdata = getnowdata()
    nowdata["message"] = "success"
    return jsonify(nowdata)
  else:#login
    passcode = request.form.get("passcode")
    if check_passcode(ac,passcode):#login success
      clicks = request.form.get("clicks")
      uploadClick(ac,clicks)
      nowdata = getnowdata()
      nowdata["message"] = "success"
      return jsonify(nowdata)
    else:#login fail
      nowdata = getnowdata()
      nowdata["message"] = "fail"
      return jsonify(nowdata)
    

#run server
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)
