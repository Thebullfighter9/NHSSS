from cryptography.fernet import Fernet

# Generate a random secret key
key = Fernet.generate_key()
cipher_suite = Fernet(key)

# Data to be encrypted
data = b"Your sensitive data goes here"

# Encrypt the data
encrypted_data = cipher_suite.encrypt(data)

# Decrypt the data
decrypted_data = cipher_suite.decrypt(encrypted_data)

# Ensure the decrypted data matches the original data
if decrypted_data == data:
    print("Data matches!")
else:
    print("Data does not match!")

# Save the key securely, as it's needed for decryption
with open("secret_key.key", "wb") as key_file:
    key_file.write(key)
