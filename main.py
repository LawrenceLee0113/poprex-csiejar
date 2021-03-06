from flask import Flask, render_template, request, json, jsonify
# import eportal
import uuid
app = Flask(__name__)


@app.route('/')
def index_page():
  return render_template("index.html")

def login_by_google(ac,name):
  with open("static/data/amount.json") as file:
    data = json.load(file)
  if ac in data["accounts"]:
    data["accounts"][ac]["login_time"]+=1
    data["accounts"][ac]["basic"]["real_name"]=name
    with open("static/data/amount.json", "w") as file:
      json.dump(data, file)
    return True
  else:
    return False

def create_account(id,name,email):
  with open("static/data/amount.json") as file:
    data = json.load(file)
  data["accounts"][id] = {
    "basic":{
      "id":id,
      "clicks":0,
      "name":name,
      "class":"no class",
      "email":email,
      "ig":"none",
      "introduce":"none",
      "real_name":name

    },
    "login_time":1,
    "passcode":""
  }
  with open("static/data/amount.json", "w") as file:
    json.dump(data, file)

def create_passcode(id):
  with open("static/data/amount.json") as file:
    data = json.load(file)
  passcode = uuid.uuid4()
  data["accounts"][id]["passcode"] = passcode
  with open("static/data/amount.json", "w") as file:
    json.dump(data, file)
  return passcode

@app.route('/google',methods=["POST"])
def google_login():
  try:
    id = request.form.get("id")
    name = request.form.get("name")
    if login_by_google(id,name) == False:
      email = request.form.get("email")
      create_account(id,name,email)
    with open("static/data/amount.json") as file:
      data = json.load(file)
    click = data["accounts"][id]["basic"]["clicks"]
    
    return jsonify({"message":"true","passcode":create_passcode(id),"click":click})

  except Exception:
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
  print(request.remote_addr)
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

@app.route('/self_info',methods=['GET','POST'])
def edit_self_info():
  if request.method == 'GET':
    try:
      ac = request.args.get("account")
      with open("static/data/amount.json") as file:
          data = json.load(file)
      print(ac)
      output = {"self_info":data["accounts"][ac]["basic"],"message":"true"}

      return jsonify(output)
    except Exception:
      return jsonify({"message":"false"})
  elif request.method == 'POST':
    try:
      ac = request.form.get("account")
      class_input = request.form.get("class")
      ig_input = request.form.get("ig")
      introduce_input = request.form.get("introduce")
      name_input = request.form.get("name")
      with open("static/data/amount.json") as file:
        data = json.load(file)
      
      data["accounts"][ac]["basic"]["class"] = class_input
      data["accounts"][ac]["basic"]["ig"] = ig_input
      data["accounts"][ac]["basic"]["name"] = name_input
      data["accounts"][ac]["basic"]["introduce"] = introduce_input
      
      with open("static/data/amount.json","w") as file:
        json.dump(data, file)
      return jsonify({"message":"true"})
    except Exception:
      return jsonify({"message":"false"})
  
#run server
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)
