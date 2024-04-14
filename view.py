data = [[2., 3], [2]]

# Flatten the list and convert all elements to strings
flattened_data = ','.join(str(item) for sublist in data for item in sublist)

print(flattened_data)
