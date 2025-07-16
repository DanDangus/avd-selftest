from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import subprocess

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict to your domain
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
def ping_host(host: str = "8.8.8.8"):
    try:
        output = subprocess.check_output(["ping", "-n", "3", host], text=True)
        return {"success": True, "output": output}
    except subprocess.CalledProcessError as e:
        return {"success": False, "error": str(e)}

@app.get("/session")
def get_session_info():
    try:
        hostname = subprocess.check_output(["hostname"], text=True).strip()
        return {"hostname": hostname}
    except:
        return {"hostname": "Unknown"}
