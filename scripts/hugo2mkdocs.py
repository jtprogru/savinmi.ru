import os
import re
import shutil

input_directory = "/Users/msavin/work/github/jtprog.ru/content"
output_directory = "/Users/msavin/work/github/savinmi.ru/docs/blog/debug_posts"
assets_directory = os.path.join(output_directory, 'assets')


def replace_categories_format(text):
    return re.sub(r'categories: (\w+)', r'categories:\n- \1', text)


def add_slug_in_frontmatter(content, new_key, new_value):
    # Match the frontmatter section (between "---" lines)
    match = re.match(r"^---\n(.*?\n)---\n(.*)", content, re.DOTALL)
    if match:
        frontmatter = match.group(1)
        rest_of_content = match.group(2)

        # Add the new key-value pair to the frontmatter
        new_entry = f"{new_key}: {new_value}\n"
        updated_frontmatter = frontmatter + new_entry

        # Write the updated content back
        updated_content = f"---\n{updated_frontmatter}---\n{rest_of_content}"
        return updated_content
    else:
        print(f"No frontmatter found in {content}")
        return content


def replace_date_format(text):
    return re.sub(r'date: ["\'](.*?)["\']', r'date: \1', text)


def add_more_separator(text):
    # Находим первую пустую строку
    blocks = text.split('\n\n', 1)

    # Если есть две части, добавляем шаблон между ними
    if len(blocks) > 1:
        updated_text = blocks[0] + '\n\n<!-- more -->\n\n' + blocks[1]
        return updated_text

    # Если нет пустых строк, возвращаем текст без изменений
    return text


# Create the output and assets directories if they do not exist
if not os.path.exists(output_directory):
    os.makedirs(output_directory)
if not os.path.exists(assets_directory):
    os.makedirs(assets_directory)

# Traverse through each file in the input directory, including subdirectories
for root, _, files in os.walk(input_directory):
    for file in files:
        input_path = os.path.join(root, file)
        slug = None | str

        if file in ['about-me.md', 'privacy-policy.md']:
            continue

        if file.endswith('.md'):
            # If the file is `index.md`, rename it to its parent directory name
            if file == 'index.md':
                parent_directory = os.path.basename(root)
                new_file_name = f"{parent_directory}.md"
                output_path = os.path.join(output_directory, new_file_name)
                slug = parent_directory
            else:
                # For other markdown files, maintain the relative path
                relative_path = os.path.relpath(input_path, input_directory)
                output_path = os.path.join(output_directory, relative_path)

            # Create the output subdirectory if it does not exist
            output_subdirectory = os.path.dirname(output_path)
            if not os.path.exists(output_subdirectory):
                os.makedirs(output_subdirectory)

            # Read the content of the input file
            with open(input_path, 'r') as f:
                content = f.read()

            # Remove Hugo shortcodes
            content = re.sub(r'{{<.*?>}}', '', content)
            content = re.sub(r'{{%.*?%}}', '', content)
            content = replace_date_format(content)
            content = add_slug_in_frontmatter(content, 'slug', slug)
            content = replace_categories_format(content)
            content = add_more_separator(content)

            # Write the cleaned content to the output file
            with open(output_path, 'w') as f:
                f.write(content)

        else:
            # For non-Markdown files (e.g., images), move them to the assets directory
            relative_path = os.path.relpath(input_path, input_directory)
            output_path = os.path.join(assets_directory, relative_path)

            # Create the output subdirectory if it does not exist
            output_subdirectory = os.path.dirname(output_path)
            if not os.path.exists(output_subdirectory):
                os.makedirs(output_subdirectory)

            # Copy the file to the assets directory
            shutil.copy2(input_path, output_path)
