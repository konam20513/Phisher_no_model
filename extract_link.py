"""import requests 
def get_final_link(url):
    try:
        r = requests.head(url, allow_redirects=True, timeout=5)
        final_url = r.url
    except requests.exceptions.Timeout:
        final_url = url
    return final_url"""
    
    
    

import re

text = "This is your e-mail body. It contains a link to <a 
href='http//www.google.com'>Google</a>."

link_pattern = re.compile('<a[^>]+href=\'(.*?)\'[^>]*>(.*)?</a>')
search = link_pattern.search(text)
if search is not None:
    print("Link found! -> " + search.group(0))
else:
    print("No links were found.")
    



  


    
    
