import xml.etree.ElementTree as ET

import requests

# Define the sitemap file location
sitemap_orig_url = 'https://jtprog.ru/sitemap.xml'
sitemap_new_url = 'http://127.0.0.1:8000/sitemap.xml'
output_orig_file = 'urls_orig.txt'
output_new_file = 'urls_new.txt'
sitemap_orig_file = 'sitemap-orig.xml'
sitemap_new_file = 'sitemap-new.xml'

# GET the sitemap XML file
sitemap_orig_resp = requests.get(sitemap_orig_url)
with open('sitemap-orig.xml', 'wb') as file:
    file.write(sitemap_orig_resp.content)

sitemap_new_resp = requests.get(sitemap_new_url)
with open('sitemap-new.xml', 'wb') as file:
    file.write(sitemap_new_resp.content)


# Parse the sitemap XML file
tree = ET.parse(sitemap_file)
root = tree.getroot()

# Define the namespace used in the sitemap (usually has "urlset" as root element)
namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}

# Extract URLs from the sitemap
urls = [url.find('ns:loc', namespace).text for url in root.findall('ns:url', namespace)]

# Clean the URLs from special URI
stop_list = [
    "tags",
    "categories",
    "privacy-policy",
    "about-me",
]
new_urls = []
# urls = set(urls)
for url in urls:
    if not any(stop_word in str(url) for stop_word in stop_list):
        # if url != "https://jtprog.ru/":
        new_urls.append(str(url))


# Write extracted URLs to an output file
with open(output_file, 'w') as file:
    for url in new_urls:
        file.write(f"{url}\n")

print(f"Successfully extracted URLs to '{output_file}'.")


def htaccess_writer():
    with open('htaccess.txt', 'w') as file:
        file.write('RewriteEngine On\n')
        for url in new_urls:
            file.write(f'RewriteRule ^{url}$ http://{url} [L]\n')
