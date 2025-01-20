import sys
import os
import pathlib

# Explicitly set the HOME directory if it's not already set
if 'HOME' not in os.environ:
    os.environ['HOME'] = 'C:\\Users\\User'  # Set this to the correct path

# Override pathlib.Path.home() to return a Path object
import pathlib
pathlib.Path.home = lambda: pathlib.Path(os.environ['HOME'])



from gpt4all import GPT4All

def generate_blog_post(topic):
    """Generate the blog post based on the topic."""
    MODEL_PATH = "C:\\Users\\User\\AppData\\Local\\nomic.ai\\GPT4All"  # Correct local model path

    try:
        model = GPT4All("Meta-Llama-3-8B-Instruct.Q4_0.gguf", model_path=MODEL_PATH, allow_download=False)
        prompt = f"Generate a blog post about: {topic}"
        response = model.generate(prompt, max_tokens=500)



        return response  # Return the clean response

    except Exception as e:
        return f"Error: {str(e)}"  # Return the error message in case of failure

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python generate_blog_post.py <topic>")
        sys.exit(1)

    topic = sys.argv[1]
   
    blog_post = generate_blog_post(topic)  # Capture the output from generate_blog_post
    print(blog_post)  # Print the cleaned-up blog post content