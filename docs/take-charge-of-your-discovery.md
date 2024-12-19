# Take charge of your discovery

Well that's nice and all but all we're seeing are question marks! That is because you haven't
discovered any species as a trainer yet. To identify a species, we'll need to send a picture of a
Pokemon so the AI can analyse it and tell us what species it is.

To do so, we'll need a dialog with an input to upload and then send our image.

## 1. The dialog

In the location of your choosing, add a button which will toggle the opening of the dialog. Note
that the button must be interactable immediately, do not place it within a menu. Create the dialog
component with suitable controls (cancel and confirm buttons as well as a close icon). Keep its
content minimal for now, we just want to ensure we can open and close it.

> 🟢 Validate the modal interaction with :
>
> ```shell
> npm run test -- discover-dialog -t="can be opened"
> ```

## 2. Sending the image

Now fill in the dialog content with a nice form to submit an image. In the service we created
earlier, add a method to send the image to the API and plug the confirm button to that method.

> 💡 The API call for this is `POST /identify`.

> 🟢 Validate the implementation with :
>
> ```shell
> npm run test -- discover-dialog
> ```

Note that, as detailed on the API's documentation, the AI is not fully ready. So to identify a
species, make sure to name the uploaded image with the name of the species you want to discover, for
example "pikachu.jpg". Lookup the list of Pokemon species on
[Wikipedia](https://en.wikipedia.org/wiki/List_of_generation_I_Pok%C3%A9mon) (only generation I
species are recognizable).

## 3. Final touch

In case of success, the API will respond with the identified species. But make sure that during the
wait something is informing the user about the ongoing operation. And once it is complete, the
dialog must close automatically and the identified species must be visible in the list.
